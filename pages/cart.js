import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { removefromcart } from "../src/features/cart/cartSlice";

const getStripe = () => {
  let stripePromise = null;
  if (!stripePromise) { 
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE);
  }
  return stripePromise;
}


export default function Cart() {

  const cartItems = useSelector(state => state.cart.items);

  const total = cartItems.reduce((acc, i) => acc + i.price, 0);

  const dispatch = useDispatch();
  
  const checkout = async () => {
    const result = await fetch('/api/stripe/payment');
    const session = await result.json();

    const stripe = await getStripe();
    stripe.redirectToCheckout({ sessionId: session.session.id })
  }


  return (
    <div className='container'>
      <div className='columns'>
        <div className='column is-4'>
        {cartItems.map(item => (
          <div className="card" key={item._id} style={{ marginTop: '5px', maxWidth: '300px' }}>
            <div className="card-content">
              <div className="content">
                <p>{item.name}</p>
                <p>$ {item.price}</p>
              </div>
              <img src={item.image} alt={item.name} style={{ height: '80px' }}/>
              <div>
                <button className='button' onClick={() => {
                  dispatch(removefromcart(item));
                }}>
                  ❌ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className='column is-8' style={{ marginTop: '20px' }}>
          <div>Total $ {total}</div>
          <button onClick={checkout} className="button is-link" disabled={cartItems.length == 0}>Checkout</button>
        </div>
      </div>
    </div>
  )
}