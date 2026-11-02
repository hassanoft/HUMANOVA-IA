# DÉPLOIEMENT RENDER — HUMANOVA

## Limitations du forfait gratuit Render

- Le service s’endort après ~15 min d’inactivité
- Premier chargement après sommeil = 30-60 secondes
- Ressources limitées (CPU/RAM)
- Pas de garantie de disponibilité 24/7
- Les webhooks peuvent échouer si le service est endormi (Dodo réessaie généralement)

Pour une vraie production, passez à un plan payant Render.

---

## Étapes détaillées

### ÉTAPE 1 — Compte Render
1. https://render.com → Sign Up (GitHub recommandé)

### ÉTAPE 2 — Dépot GitHub
1. Créez un dépôt GitHub (public ou privé)
2. Poussez le code HUMANOVA (sans node_modules, sans .env)

### ÉTAPE 3 — Nouveau Web Service
1. Dashboard Render → **New +** → **Web Service**
2. Connectez le dépôt GitHub HUMANOVA
3. Sélectionnez la branche `main`

### ÉTAPE 4 — Configuration
- **Name** : humanova (ou autre)
- **Region** : la plus proche
- **Runtime** : Node
- **Build Command** : `npm install --legacy-peer-deps && npm run build`
- **Start Command** : `npm start`
- **Instance type** : Free

### ÉTAPE 5 — Variables d’environnement
1. **Environment** → Add Environment Variable
2. Ajoutez **toutes** les variables de `.env.example` avec vos vraies valeurs
3. `NODE_ENV` = `production`
4. `NEXT_PUBLIC_APP_URL` = `https://votre-nom.onrender.com`

### ÉTAPE 6 — Déployer
1. **Create Web Service**
2. Attendez le premier build (5-10 min)
3. Regardez les **Logs**

### ÉTAPE 7 — Après le premier déploiement
1. Copiez l’URL Render (ex: https://humanova-xxxx.onrender.com)
2. Mettez à jour `NEXT_PUBLIC_APP_URL` si besoin + redéployez
3. Dans Supabase → Authentication → URL Configuration : mettez cette URL
4. Dans Dodo → Webhooks : mettez `https://.../api/webhooks/dodo`

### ÉTAPE 8 — Tests finaux
1. Ouvrez l’URL
2. Créez un compte
3. Testez une transformation (avec crédits gratuits)
4. Vérifiez les logs Render et Supabase

## Erreurs fréquentes

| Erreur | Cause | Solution |
|--------|-------|----------|
| Build failed | Dépendances | Vérifier `npm install --legacy-peer-deps` |
| Missing env | Variable oubliée | Ajouter dans Environment |
| 502 / timeout | Service endormi | Attendre le réveil |
| Auth redirect fail | URL Supabase | Mettre à jour Site URL + Redirect |

