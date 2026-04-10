const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, coachId, clientId, slot, format } = req.body;

    // Calcul commission
    // Client paie : montant + 3%
    // Coach reçoit : montant - 5%
    const clientAmount = Math.round(amount * 1.03 * 100); // en centimes

    const paymentIntent = await stripe.paymentIntents.create({
      amount: clientAmount,
      currency: 'eur',
      metadata: {
        coachId,
        clientId,
        slot,
        format,
        originalAmount: amount,
        sportriqCommission: Math.round(amount * 0.08 * 100),
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      totalAmount: clientAmount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};