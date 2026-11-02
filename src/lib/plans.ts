export type PlanId = "free" | "starter" | "pro" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  priceMonthlyFCFA: number;
  wordsPerMonth: number;
  dailyLimit: number | null; // null = no daily limit (use monthly)
  maxWordsPerRequest: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Gratuit",
    priceMonthlyFCFA: 0,
    wordsPerMonth: 1500, // ~3 * 500
    dailyLimit: 3,
    maxWordsPerRequest: 500,
    description: "Pour découvrir HUMANOVA",
    features: [
      "3 traitements par jour",
      "Maximum 500 mots par traitement",
      "Tous les modes de transformation",
      "Historique limité (7 jours)",
    ],
  },
  starter: {
    id: "starter",
    name: "Starter",
    priceMonthlyFCFA: 1500,
    wordsPerMonth: 20000,
    dailyLimit: null,
    maxWordsPerRequest: 2000,
    description: "Idéal pour les étudiants et freelances",
    features: [
      "20 000 mots par mois",
      "Maximum 2 000 mots par traitement",
      "Tous les modes",
      "Historique complet",
      "Support email",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    priceMonthlyFCFA: 3500,
    wordsPerMonth: 100000,
    dailyLimit: null,
    maxWordsPerRequest: 4000,
    description: "Pour les créateurs et professionnels",
    features: [
      "100 000 mots par mois",
      "Maximum 4 000 mots par traitement",
      "Priorité de traitement",
      "Historique illimité",
      "Support prioritaire",
    ],
    popular: true,
  },
  business: {
    id: "business",
    name: "Business",
    priceMonthlyFCFA: 9000,
    wordsPerMonth: 300000,
    dailyLimit: null,
    maxWordsPerRequest: 8000,
    description: "Pour les agences et équipes",
    features: [
      "300 000 mots par mois",
      "Maximum 8 000 mots par traitement",
      "API (bientôt)",
      "Support dédié",
      "Facturation entreprise",
    ],
  },
};

export const TRANSFORMATION_MODES = [
  {
    id: "naturel",
    label: "Naturel",
    description: "Rend le texte plus fluide et humain",
  },
  {
    id: "academique",
    label: "Académique",
    description: "Style formel et précis pour les travaux universitaires",
  },
  {
    id: "professionnel",
    label: "Professionnel",
    description: "Ton corporate et clair",
  },
  {
    id: "conversationnel",
    label: "Conversationnel",
    description: "Style oral et engageant",
  },
  {
    id: "simplification",
    label: "Simplification",
    description: "Rend le texte plus simple et accessible",
  },
  {
    id: "correction",
    label: "Correction grammaticale",
    description: "Corrige grammaire, orthographe et syntaxe",
  },
] as const;

export type TransformMode = (typeof TRANSFORMATION_MODES)[number]["id"];

export const INTENSITY_LEVELS = [
  { value: 1, label: "Léger" },
  { value: 2, label: "Modéré" },
  { value: 3, label: "Fort" },
] as const;
