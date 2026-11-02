import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Webhook Dodo Payments
 * L'activation d'abonnement se fait UNIQUEMENT ici après vérification.
 * TODO: brancher la vérification de signature avec DODO_PAYMENTS_WEBHOOK_KEY
 * selon la documentation officielle Dodo (standardwebhooks ou SDK).
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    // TODO: verify signature with DODO_PAYMENTS_WEBHOOK_KEY
    // const signature = request.headers.get("webhook-signature") or equivalent

    const event = JSON.parse(rawBody);
    const service = createServiceClient();

    // Exemple de gestion (à adapter aux payloads réels Dodo)
    const type = event.type || event.event_type;
    const data = event.data || event;

    if (type === "subscription.active" || type === "subscription.renewed") {
      const customerId = data.customer_id || data.customer?.customer_id;
      const subscriptionId = data.subscription_id;
      const productId = data.product_id;
      // Map productId -> plan_id
      let planId = "starter";
      if (productId === process.env.DODO_PRODUCT_PRO_ID) planId = "pro";
      if (productId === process.env.DODO_PRODUCT_BUSINESS_ID) planId = "business";

      // Trouver l'utilisateur via dodo_customer_id ou metadata
      // (à compléter selon votre mapping)
      console.log("Subscription event", { type, customerId, subscriptionId, planId });
    }

    // Log payment
    const { error: paymentInsertError } = await service.from("payments").insert({
      user_id: data.metadata?.user_id || null,
      dodo_payment_id: data.payment_id,
      dodo_subscription_id: data.subscription_id,
      product_id: data.product_id,
      amount: data.total_amount || data.amount,
      status: data.status || "succeeded",
      event_type: type,
      raw_payload: event,
    });

    if (paymentInsertError) {
      console.error("Unable to log Dodo payment webhook:", paymentInsertError);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
