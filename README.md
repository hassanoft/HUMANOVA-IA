# HUMANOVA

**Application SaaS d'humanisation et de transformation de textes assistée par IA**

Stack : Next.js 15 (App Router) · TypeScript · Tailwind CSS · Supabase · OpenAI · Dodo Payments · Render

---

## Démarrage rapide (local)

1. Extraire le projet
2. Copier `.env.example` → `.env.local` et renseigner les clés (voir `docs/CONFIGURATION_DES_CLES.md`)
3. Installer les dépendances :
   ```bash
   npm install --legacy-peer-deps
   ```
4. Exécuter les migrations SQL dans Supabase (voir `docs/SUPABASE_SETUP.md`)
5. Lancer :
   ```bash
   npm run dev
   ```
6. Ouvrir http://localhost:3000

## Scripts

- `npm run dev` — développement
- `npm run build` — build de production
- `npm start` — démarrer en production (après build)
- `npm run lint` — ESLint
- `npm run typecheck` — vérification TypeScript

## Structure

```
src/
  app/                  # App Router (pages + API)
  components/           # UI
  lib/                  # Supabase, OpenAI, plans, utils
  middleware.ts         # Auth + session
supabase/migrations/    # SQL
docs/                   # Documentation complète
```

## Documentation

| Document | Contenu |
|----------|---------|
| `docs/AUDIT_HUMANOVA.md` | Audit du projet |
| `docs/CONFIGURATION_DES_CLES.md` | Où récupérer et placer chaque clé |
| `docs/SUPABASE_SETUP.md` | Création projet + migrations + RLS |
| `docs/DODO_SETUP.md` | Compte Dodo + produits + webhooks |
| `docs/DEPLOIEMENT_RENDER.md` | Déploiement pas à pas sur Render |
| `docs/CGU_POLITIQUE.md` | Modèles CGU / confidentialité |

## Sécurité

- Aucune clé secrète dans le code source
- OpenAI et Dodo uniquement côté serveur
- RLS strict sur Supabase
- Quotas vérifiés côté serveur avant chaque traitement
- Webhooks Dodo signés

## Licence

Projet privé — HUMANOVA
