import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PLANS } from "@/lib/plans";
import { formatNumber } from "@/lib/utils";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const plan = PLANS[(profile?.plan_id as keyof typeof PLANS) || "free"];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold text-indigo-600">
            HUMANOVA
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/transform" className="hover:text-indigo-600">
              Transformer
            </Link>
            <Link href="/history" className="hover:text-indigo-600">
              Historique
            </Link>
            <Link href="/billing" className="hover:text-indigo-600">
              Abonnement
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-2">
          Bonjour{profile?.full_name ? `, ${profile.full_name}` : ""}
        </h1>
        <p className="text-slate-600 mb-8">
          Plan actuel : <strong>{plan.name}</strong>
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-slate-500">Mots utilisés ce mois</p>
            <p className="text-2xl font-bold mt-1">
              {formatNumber(profile?.words_used_this_month || 0)} /{" "}
              {formatNumber(plan.wordsPerMonth)}
            </p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-slate-500">Plan</p>
            <p className="text-2xl font-bold mt-1">{plan.name}</p>
          </div>
          <div className="bg-white rounded-xl border p-5">
            <p className="text-sm text-slate-500">Statut</p>
            <p className="text-2xl font-bold mt-1 capitalize">
              {profile?.subscription_status || "none"}
            </p>
          </div>
        </div>

        <Link
          href="/transform"
          className="inline-flex bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700"
        >
          Nouvelle transformation
        </Link>
      </main>
    </div>
  );
}
