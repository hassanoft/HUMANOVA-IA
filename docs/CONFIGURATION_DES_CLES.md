# CONFIGURATION DES CLÉS API — HUMANOVA

**Règle absolue** : ne communiquez jamais vos clés réelles dans une conversation avec une IA ou sur un forum.

## Tableau récapitulatif

| Variable | Service | Publique / Secrète | Où la récupérer | Où la mettre |
|----------|---------|--------------------|-----------------|--------------|
| OPENAI_API_KEY | OpenAI | **Secrète** | platform.openai.com → API keys | Render Environment + .env.local |
| OPENAI_MODEL | OpenAI | Publique (config) | Choisir gpt-4o-mini ou gpt-4o | Idem |
| NEXT_PUBLIC_SUPABASE_URL | Supabase | Publique | Project Settings → API | Idem |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase | Publique | Project Settings → API | Idem |
| SUPABASE_SERVICE_ROLE_KEY | Supabase | **Secrète** | Project Settings → API | Idem (serveur uniquement) |
| DODO_PAYMENTS_API_KEY | Dodo | **Secrète** | Dashboard → Developer → API Keys | Idem |
| DODO_PAYMENTS_WEBHOOK_KEY | Dodo | **Secrète** | Dashboard → Developer → Webhooks | Idem |
| DODO_PAYMENTS_ENVIRONMENT | Dodo | Config | `test_mode` ou `live_mode` | Idem |
| DODO_PRODUCT_STARTER_ID | Dodo | Config | Après création produit | Idem |
| DODO_PRODUCT_PRO_ID | Dodo | Config | Après création produit | Idem |
| DODO_PRODUCT_BUSINESS_ID | Dodo | Config | Après création produit | Idem |
| NEXT_PUBLIC_APP_URL | App | Publique | URL Render (ex: https://humanova.onrender.com) | Idem |
| NODE_ENV | Node | Config | `production` sur Render | Idem |

---

## 1. OpenAI

1. Allez sur https://platform.openai.com
2. Connectez-vous / créez un compte
3. Menu de gauche → **API keys**
4. **Create new secret key**
5. Copiez la clé (elle commence par `sk-...`)
6. Collez-la dans `OPENAI_API_KEY`
7. Pour le modèle : `gpt-4o-mini` (économique) ou `gpt-4o`

**Vérification** : un appel réussi à `/api/transform` retourne un texte transformé.

**Erreurs fréquentes** :
- Clé expirée ou révoquée
- Quota OpenAI épuisé
- Mauvaise région / billing non activé

---

## 2. Supabase

1. https://supabase.com → New project
2. Choisissez un nom (ex: humanova), mot de passe DB fort, région proche
3. Attendez la création
4. **Project Settings** (icône engrenage) → **API**
5. Copiez :
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` → `SUPABASE_SERVICE_ROLE_KEY` (ne jamais exposer au navigateur)

**Puis** : exécutez le fichier `supabase/migrations/001_initial_schema.sql` dans le SQL Editor.

**Auth URL** : Authentication → URL Configuration  
- Site URL = votre URL Render  
- Redirect URLs = `https://votre-app.onrender.com/**`

---

## 3. Dodo Payments

1. https://dodopayments.com → créer un compte
2. Vérification d’identité si demandée
3. **Developer → API Keys** → Create (mode Test d’abord)
4. **Products** → créer 3 produits abonnement (Starter 1500 XOF, Pro 3500, Business 9000)
5. Copiez les `product_id` (commencent souvent par `pdt_`)
6. **Developer → Webhooks** → Add endpoint  
   URL : `https://votre-app.onrender.com/api/webhooks/dodo`  
   Copiez le signing secret → `DODO_PAYMENTS_WEBHOOK_KEY`

Voir `docs/DODO_SETUP.md` pour le détail complet.

---

## 4. Sur Render

Après création du Web Service :

1. Environment → Add Environment Variable
2. Ajoutez **une par une** toutes les variables ci-dessus
3. Pour `NEXT_PUBLIC_APP_URL` mettez l’URL finale Render (https://...)
4. Redéployez après modification des variables

