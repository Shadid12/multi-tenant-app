const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async function PaymentMethod(req, res) {
  const { accountId, price } = JSON.parse(req.body);
  if(req.method === 'POST') { 
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: parseInt(price),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000',
      payment_intent_data: {
        application_fee_amount: 220,
        transfer_data: {
          destination: accountId,
        },
      },
    });
  
    res.status(200).json({ session });
  }
};