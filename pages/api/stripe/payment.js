export default async function PaymentMethod(req, res) {

  const stripe = require('stripe')(process.env.STRIPE_SECRET);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000'
  });

  res.status(200).json({ session });
};