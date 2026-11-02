# DODO PAYMENTS SETUP — HUMANOVA

## Important

- Distinguez toujours **test_mode** et **live_mode**
- Un retour navigateur sur une page "succès" **n’active jamais** l’abonnement
- Seul un webhook authentifié côté serveur active le plan

## 1. Créer le compte

1. https://dodopayments.com
2. Sign up
3. Complétez la vérification d’identité si demandée
4. Configurez le profil marchand

## 2. Clés API

1. Dashboard → **Developer** → **API Keys**
2. Create New Key (commencez en **Test Mode**)
3. Copiez → `DODO_PAYMENTS_API_KEY`

## 3. Créer les produits

1. **Products** → Create Product
2. Créez 3 produits de type **Subscription** (mensuel) :

| Nom | Prix | Variable |
|-----|------|----------|
| HUMANOVA Starter | 1500 XOF / mois | DODO_PRODUCT_STARTER_ID |
| HUMANOVA Pro | 3500 XOF / mois | DODO_PRODUCT_PRO_ID |
| HUMANOVA Business | 9000 XOF / mois | DODO_PRODUCT_BUSINESS_ID |

3. Après création, copiez chaque `product_id` (ex: `pdt_...`)

## 4. Webhook

1. **Developer** → **Webhooks** → Add Endpoint
2. URL : `https://VOTRE-APP.onrender.com/api/webhooks/dodo`
3. Sélectionnez les événements :
   - subscription.active
   - subscription.renewed
   - subscription.cancelled
   - subscription.expired
   - payment.succeeded
   - payment.failed
4. Copiez le **Signing Secret** → `DODO_PAYMENTS_WEBHOOK_KEY`

## 5. Variables Render

Ajoutez toutes les variables DODO_* dans Environment de votre Web Service Render.

## 6. Test

1. Mettez `DODO_PAYMENTS_ENVIRONMENT=test_mode`
2. Utilisez les cartes de test fournies par Dodo
3. Vérifiez dans les logs Render que le webhook est reçu
4. Vérifiez que le `plan_id` du profil utilisateur a changé

## Passage en production

1. Créez de nouvelles clés en **Live Mode**
2. Créez les produits en Live
3. Changez `DODO_PAYMENTS_ENVIRONMENT=live_mode`
4. Mettez à jour les product IDs
5. Pointez le webhook vers la même URL (ou une URL live)

