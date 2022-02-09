export default async function CreateAccount(req, res) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET);
  const account = await stripe.accounts.create({
    type: 'express',
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
      legacy_payments: { requested: true },
    }
  });
  res.status(200).json({ account });
};