# SUPABASE SETUP — HUMANOVA

## 1. Créer le projet

1. Allez sur https://supabase.com et connectez-vous
2. **New project**
3. Organisation → choisissez ou créez
4. Name : `humanova` (ou autre)
5. Database Password : générez un mot de passe fort et **sauvegardez-le**
6. Region : choisissez la plus proche (ex: Frankfurt, Paris si disponible)
7. **Create new project** → attendez 1-2 minutes

## 2. Récupérer les clés

1. Menu gauche → **Project Settings** (icône engrenage en bas)
2. **API**
3. Copiez :
   - **Project URL**
   - **anon public**
   - **service_role** (cliquez Reveal)

## 3. Exécuter les migrations

1. Menu gauche → **SQL Editor**
2. **New query**
3. Ouvrez le fichier `supabase/migrations/001_initial_schema.sql` de ce projet
4. Copiez **tout** le contenu
5. Collez dans l’éditeur SQL
6. **Run** (ou Ctrl/Cmd + Enter)
7. Vérifiez qu’il n’y a pas d’erreur rouge

## 4. Configurer l’authentification

1. **Authentication** → **Providers** → Email activé (par défaut)
2. **Authentication** → **URL Configuration**
   - Site URL : `http://localhost:3000` (dev) puis votre URL Render
   - Redirect URLs : ajoutez  
     `http://localhost:3000/**`  
     `https://votre-app.onrender.com/**`

## 5. Tester

1. Dans l’app : allez sur /auth/register
2. Créez un compte
3. Vérifiez dans Supabase → **Authentication** → Users qu’il apparaît
4. Vérifiez dans **Table Editor** → `profiles` qu’une ligne a été créée

## RLS

Les politiques sont déjà dans le fichier SQL.  
Un utilisateur ne peut voir/modifier que ses propres données.  
Les changements de plan / crédits se font uniquement via la service_role côté serveur.

