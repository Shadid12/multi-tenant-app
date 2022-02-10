const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async function PaymentMethod(req, res) {
  const { cartItems } = JSON.parse(req.body);
  const line_items = [];

  Object.entries(cartItems).forEach(([_key, item]) => {
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    });
  })

  if(req.method === 'POST') { 
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000',
      payment_intent_data: {
        application_fee_amount: 220,
        transfer_data: {
          destination: Object.values(cartItems)[0].owner.stripeAccount,
        },
      },
    });
  
    res.status(200).json({ session });
  }
};