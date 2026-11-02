import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-indigo-600">
            HUMANOVA
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Connexion
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Commencer gratuitement
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
          Humanisez vos textes
          <br />
          <span className="text-indigo-600">avec l’intelligence artificielle</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          Transformez, corrigez et améliorez vos écrits en quelques secondes.
          Naturel, académique, professionnel ou conversationnel — choisissez le style qui vous convient.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            Essayer gratuitement
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center border border-slate-300 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
          >
            Voir les tarifs
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Modes de transformation</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["Naturel", "Rendez vos textes plus fluides et humains"],
              ["Académique", "Style formel pour vos travaux universitaires"],
              ["Professionnel", "Ton corporate clair et précis"],
              ["Conversationnel", "Style oral et engageant"],
              ["Simplification", "Rendez le contenu accessible à tous"],
              ["Correction", "Grammaire, orthographe et syntaxe"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="pricing" className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Des tarifs simples et transparents</h2>
          <p className="text-slate-600 mb-10">
            Commencez gratuitement. Passez à un plan supérieur quand vous en avez besoin.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { name: "Gratuit", price: "0", words: "3 traitements / jour" },
              { name: "Starter", price: "1 500", words: "20 000 mots / mois" },
              { name: "Pro", price: "3 500", words: "100 000 mots / mois", popular: true },
              { name: "Business", price: "9 000", words: "300 000 mots / mois" },
            ].map((p) => (
              <div
                key={p.name}
                className={`p-6 rounded-2xl border ${
                  p.popular
                    ? "border-indigo-500 ring-2 ring-indigo-100"
                    : "border-slate-200"
                } bg-white`}
              >
                {p.popular && (
                  <span className="text-xs font-semibold text-indigo-600 uppercase">
                    Populaire
                  </span>
                )}
                <h3 className="font-bold text-lg mt-1">{p.name}</h3>
                <p className="text-3xl font-bold my-3">
                  {p.price}
                  <span className="text-sm font-normal text-slate-500"> FCFA/mois</span>
                </p>
                <p className="text-sm text-slate-600">{p.words}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} HUMANOVA — Outil de réécriture et d’amélioration de style.</p>
        <p className="mt-2 max-w-xl mx-auto">
          HUMANOVA n’est pas un outil de contournement de détecteurs d’IA ni de fraude académique.
          Utilisez-le de manière responsable.
        </p>
      </footer>
    </div>
  );
}
