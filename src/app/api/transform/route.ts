import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { transformText } from "@/lib/openai";
import { PLANS, TransformMode } from "@/lib/plans";
import { countWords } from "@/lib/utils";

const bodySchema = z.object({
  text: z.string().min(10, "Texte trop court").max(50000, "Texte trop long"),
  mode: z.enum([
    "naturel",
    "academique",
    "professionnel",
    "conversationnel",
    "simplification",
    "correction",
  ]),
  intensity: z.union([z.literal(1), z.literal(2), z.literal(3)]),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Auth
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // 2. Validate body
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { text, mode, intensity } = parsed.data;
    const wordCount = countWords(text);

    // 3. Load profile with service role for accurate quotas
    const service = createServiceClient();
    const { data: profile, error: profileError } = await service
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Profil introuvable" },
        { status: 404 }
      );
    }

    const plan = PLANS[profile.plan_id as keyof typeof PLANS] || PLANS.free;

    // 4. Check limits
    if (wordCount > plan.maxWordsPerRequest) {
      return NextResponse.json(
        {
          error: `Votre plan ${plan.name} limite à ${plan.maxWordsPerRequest} mots par traitement. Votre texte en contient ${wordCount}.`,
        },
        { status: 403 }
      );
    }

    // Daily limit for free
    const today = new Date().toISOString().slice(0, 10);
    if (plan.dailyLimit !== null) {
      const isToday = profile.last_transform_date === today;
      const dailyCount = isToday ? profile.daily_transforms_count : 0;
      if (dailyCount >= plan.dailyLimit) {
        return NextResponse.json(
          {
            error: `Limite quotidienne atteinte (${plan.dailyLimit} traitements/jour sur le plan Gratuit). Passez à un plan supérieur.`,
          },
          { status: 403 }
        );
      }
    }

    // Monthly words
    if (profile.words_used_this_month + wordCount > plan.wordsPerMonth) {
      return NextResponse.json(
        {
          error: `Quota mensuel de mots atteint (${plan.wordsPerMonth} mots). Passez à un plan supérieur ou attendez le renouvellement.`,
        },
        { status: 403 }
      );
    }

    // 5. Call OpenAI
    let transformed: string;
    try {
      transformed = await transformText({
        text,
        mode: mode as TransformMode,
        intensity,
      });
    } catch (aiError: unknown) {
      const errorMessage =
        aiError instanceof Error ? aiError.message : String(aiError);
      console.error("OpenAI error:", errorMessage);
      return NextResponse.json(
        { error: "Erreur lors du traitement IA. Réessayez dans un instant." },
        { status: 502 }
      );
    }

    // 6. Atomic update of usage + insert document (service role)
    const newDailyCount =
      profile.last_transform_date === today
        ? profile.daily_transforms_count + 1
        : 1;

    const { data: doc, error: docError } = await service
      .from("documents")
      .insert({
        user_id: user.id,
        original_text: text,
        transformed_text: transformed,
        mode,
        intensity,
        word_count: wordCount,
      })
      .select("id")
      .single();

    if (docError) {
      console.error("Document insert error:", docError);
      return NextResponse.json(
        { error: "Erreur d'enregistrement" },
        { status: 500 }
      );
    }

    // Update profile usage
    await service
      .from("profiles")
      .update({
        words_used_this_month: profile.words_used_this_month + wordCount,
        daily_transforms_count: newDailyCount,
        last_transform_date: today,
      })
      .eq("id", user.id);

    // Usage log
    await service.from("usage_logs").insert({
      user_id: user.id,
      document_id: doc.id,
      words_consumed: wordCount,
      mode,
    });

    return NextResponse.json({
      success: true,
      transformed,
      wordCount,
      documentId: doc.id,
      remainingWords:
        plan.wordsPerMonth - (profile.words_used_this_month + wordCount),
    });
  } catch (err: unknown) {
    console.error("Transform API error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
