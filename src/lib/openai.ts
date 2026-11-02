import OpenAI from "openai";
import { TransformMode } from "./plans";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const MODE_PROMPTS: Record<TransformMode, string> = {
  naturel: `Tu es un expert en réécriture de textes. Réécris le texte fourni pour le rendre plus naturel, fluide et humain, comme s'il avait été écrit par une personne compétente. Conserve le sens exact, le ton et les informations. Ne rajoute pas d'informations inventées.`,
  academique: `Tu es un expert en rédaction académique. Réécris le texte fourni dans un style académique formel, précis et structuré, adapté à un contexte universitaire ou de recherche. Conserve le sens exact. Utilise un vocabulaire rigoureux.`,
  professionnel: `Tu es un expert en communication professionnelle. Réécris le texte fourni dans un ton professionnel, clair, concis et corporate. Conserve le sens exact. Évite le jargon inutile.`,
  conversationnel: `Tu es un expert en rédaction engageante. Réécris le texte fourni dans un style conversationnel, chaleureux et oral, comme si tu parlais à un ami ou à un lecteur proche. Conserve le sens exact.`,
  simplification: `Tu es un expert en vulgarisation. Réécris le texte fourni pour le rendre plus simple, clair et accessible à un public non-spécialiste. Conserve le sens exact. Utilise des phrases plus courtes et un vocabulaire courant.`,
  correction: `Tu es un correcteur professionnel. Corrige uniquement les erreurs de grammaire, d'orthographe, de conjugaison, de ponctuation et de syntaxe du texte fourni. Ne change pas le style ni le sens. Si le texte est déjà correct, renvoie-le quasi identique.`,
};

const INTENSITY_INSTRUCTIONS: Record<number, string> = {
  1: "Applique des modifications légères. Reste très proche du texte original.",
  2: "Applique des modifications modérées. Améliore clairement le style tout en restant fidèle.",
  3: "Applique des modifications fortes. Transforme significativement le style tout en conservant le sens exact.",
};

export interface TransformOptions {
  text: string;
  mode: TransformMode;
  intensity: 1 | 2 | 3;
}

export async function transformText(options: TransformOptions): Promise<string> {
  const { text, mode, intensity } = options;

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY non configurée");
  }

  const systemPrompt = `${MODE_PROMPTS[mode]}

${INTENSITY_INSTRUCTIONS[intensity]}

Règles strictes :
- Réponds UNIQUEMENT avec le texte transformé.
- N'ajoute aucun commentaire, titre, markdown ou explication.
- Conserve la langue originale du texte (français, anglais, etc.).
- Ne change pas le sens ni les faits.
- Ne raccourcis ni n'allonge excessivement le texte.`;

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: text },
    ],
    temperature: intensity === 1 ? 0.3 : intensity === 2 ? 0.5 : 0.7,
    max_tokens: Math.min(4000, Math.ceil(text.length * 1.5)),
  });

  const result = response.choices[0]?.message?.content?.trim();

  if (!result) {
    throw new Error("Réponse OpenAI vide ou invalide");
  }

  return result;
}
