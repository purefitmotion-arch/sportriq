import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "./supabase";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ amount, coachName, onSuccess, onCancel, lang, C }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    supabase.functions.invoke("create-payment-intent", {
      body: { amount, currency: "eur" },
    }).then(({ data, error }) => {
      if (error) setError(error.message);
      else setClientSecret(data.clientSecret);
    });
  }, [amount]);

  const handleSubmit = async () => {
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);
    setError(null);

    const cardEl = elements.getElement(CardElement);
    const { error: stripeErr, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardEl },
    });

    setLoading(false);
    if (stripeErr) {
      setError(stripeErr.message);
    } else if (paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent);
    }
  };

  const cardStyle = {
    hidePostalCode: true, // ✅ Code postal désactivé
    style: {
      base: {
        color: C.txt,
        fontFamily: "sans-serif",
        fontSize: "14px",
        "::placeholder": { color: C.muted },
      },
      invalid: { color: C.red },
    },
  };

  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>
          {lang === "fr" ? "Paiement sécurisé via Stripe" : "Secure payment via Stripe"} 🔒
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.txt, marginBottom: 12 }}>
          {coachName} · <span style={{ color: C.accent }}>{amount}€</span>
        </div>
        <div style={{
          padding: "12px 14px",
          borderRadius: 10,
          border: `1px solid ${C.border}`,
          background: "rgba(255,255,255,0.04)",
        }}>
          {clientSecret ? (
            <CardElement options={cardStyle} />
          ) : (
            <div style={{ color: C.muted, fontSize: 13 }}>
              {lang === "fr" ? "Chargement…" : "Loading…"}
            </div>
          )}
        </div>
        {error && (
          <div style={{ color: C.red, fontSize: 12, marginTop: 8 }}>{error}</div>
        )}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onCancel}
          style={{ flex: 1, padding: 11, borderRadius: 10, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, cursor: "pointer", fontSize: 13 }}>
          ← {lang === "fr" ? "Retour" : "Back"}
        </button>
        <button onClick={handleSubmit} disabled={loading || !clientSecret}
          style={{ flex: 2, padding: 11, borderRadius: 10, background: (loading || !clientSecret) ? "#555" : `linear-gradient(135deg,${C.accent},${C.accent2})`, border: "none", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
          {loading ? "⏳" : `${lang === "fr" ? "Payer" : "Pay"} ${amount}€`}
        </button>
      </div>
    </div>
  );
}

export default function StripePayment({ amount, coachName, onSuccess, onCancel, lang, C }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        amount={amount}
        coachName={coachName}
        onSuccess={onSuccess}
        onCancel={onCancel}
        lang={lang}
        C={C}
      />
    </Elements>
  );
}