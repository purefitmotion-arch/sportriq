const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { clientEmail, clientName, coachName, format, slot, amount } = await req.json();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Sportriq <hello@sportriq.com>",
      to: clientEmail,
      subject: `✅ Réservation confirmée — ${coachName}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0E0E1A;color:#F0F0FF;border-radius:16px">
          <h1 style="font-size:28px;margin-bottom:8px;color:#6C63FF">Sportriq</h1>
          <h2 style="color:#F0F0FF;font-size:20px;margin-bottom:24px">🎉 Réservation confirmée !</h2>
          <p style="color:#8888AA;font-size:15px;margin-bottom:24px">Bonjour <strong style="color:#F0F0FF">${clientName}</strong>,</p>
          <div style="background:#16162A;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:24px">
            <div style="margin-bottom:12px"><span style="color:#8888AA;font-size:13px">Coach</span><br/><span style="color:#F0F0FF;font-weight:700;font-size:16px">${coachName}</span></div>
            <div style="margin-bottom:12px"><span style="color:#8888AA;font-size:13px">Format</span><br/><span style="color:#F0F0FF;font-weight:600">${format}</span></div>
            ${slot ? `<div style="margin-bottom:12px"><span style="color:#8888AA;font-size:13px">Créneau</span><br/><span style="color:#F0F0FF;font-weight:600">${slot}</span></div>` : ""}
            <div><span style="color:#8888AA;font-size:13px">Montant payé</span><br/><span style="color:#6C63FF;font-weight:800;font-size:20px">${amount}€</span></div>
          </div>
          <p style="color:#8888AA;font-size:13px">Des questions ? <a href="mailto:hello@sportriq.com" style="color:#6C63FF">hello@sportriq.com</a></p>
          <p style="color:#8888AA;font-size:13px;margin-top:24px">À bientôt sur Sportriq 🏆</p>
        </div>
      `,
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});