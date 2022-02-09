import { loadStripe } from '@stripe/stripe-js';

const getStripe = () => {
  let stripePromise = null;
  if (!stripePromise) { 
    stripePromise = loadStripe('pk_test_jR4QLTaldFF5FbzPZU1wqXQa00bLEHG64y');
  }
  return stripePromise;
}


export default function Cart() {
  
  const fire = async () => {
    const result = await fetch('/api/stripe/payment');
    const session = await result.json();
    console.log(session);

    const stripe = await getStripe();
    stripe.redirectToCheckout({ sessionId: session.session.id })
  }

  return (
    <div>
      <button onClick={fire}>Fire Stripe</button>
    </div>
  )
}