export default async function CreateAccount(req, res) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET);
  const account = await stripe.accounts.create({type: 'express'});

  res.status(200).json({ account });
};