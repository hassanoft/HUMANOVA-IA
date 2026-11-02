"use client";

import { useState } from "react";
import Link from "next/link";
import { TRANSFORMATION_MODES, INTENSITY_LEVELS } from "@/lib/plans";
import { toast } from "sonner";
import { countWords } from "@/lib/utils";

export default function TransformPage() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("naturel");
  const [intensity, setIntensity] = useState(2);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTransform() {
    if (text.trim().length < 10) {
      toast.error("Le texte doit contenir au moins 10 caractères");
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode, intensity }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Erreur");
        return;
      }
      setResult(data.transformed);
      toast.success("Transformation terminée");
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    toast.success("Copié !");
  }

  function downloadTxt() {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "humanova-resultat.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold text-indigo-600">
            HUMANOVA
          </Link>
          <Link href="/dashboard" className="text-sm text-slate-600">
            Tableau de bord
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Transformer un texte</h1>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Votre texte ({countWords(text)} mots)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                placeholder="Collez ou écrivez votre texte ici..."
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {TRANSFORMATION_MODES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Intensité</label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {INTENSITY_LEVELS.map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleTransform}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Traitement en cours..." : "Lancer la transformation"}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Résultat</label>
            <textarea
              value={result}
              readOnly
              rows={12}
              placeholder="Le texte transformé apparaîtra ici..."
              className="w-full border rounded-xl p-3 bg-white text-sm"
            />
            {result && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={copyResult}
                  className="flex-1 border rounded-lg py-2 text-sm font-medium hover:bg-slate-100"
                >
                  Copier
                </button>
                <button
                  onClick={downloadTxt}
                  className="flex-1 border rounded-lg py-2 text-sm font-medium hover:bg-slate-100"
                >
                  Télécharger TXT
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-500 max-w-2xl">
          Avertissement : HUMANOVA est un outil d’amélioration de style et de
          réécriture. Ne l’utilisez pas pour frauder, tromper des systèmes de
          détection ou contourner des règles académiques ou professionnelles.
        </p>
      </main>
    </div>
  );
}
