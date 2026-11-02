import Link from "next/link";

// Force Next.js to generate the App Router 404 page statically.
export const dynamic = "force-static";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center text-slate-900">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
        HUMANOVA
      </p>
      <h1 className="mt-4 text-7xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page introuvable</h2>
      <p className="mt-3 max-w-md text-slate-600">
        La page que tu recherches n’existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
