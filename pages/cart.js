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

  console.log('cartItems', cartItems);

  let total = 0;
  Object.entries(cartItems).forEach(([_key, item]) => {
    total = total + item.quantity * item.price;
  });

  const dispatch = useDispatch();
  
  const checkout = async () => {
    const result = await fetch(`/api/stripe/payment`, {
      method: 'POST',
      body: JSON.stringify({
        cartItems
      })
    });
    const session = await result.json();

    const stripe = await getStripe();
    stripe.redirectToCheckout({ sessionId: session.session.id })
  }


  return (
    <div className='container'>
      <div className='columns'>
        <div className='column is-4'>
        {Object.entries(cartItems).map(([_key, item]) => {
          console.log('_key', _key);
          return (
            <div className="card" key={_key} style={{ marginTop: '5px', maxWidth: '300px' }}>
              <div className="card-content">
                <div className="content">
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                </div>
                <img src={item.image} alt={item.name} style={{ height: '80px' }}/>

                {
                  item.quantity > 1 ? ( 
                    <div>
                      <div>Quantity: {item.quantity} </div>
                      <button className="button is-danger is-light" 
                      onClick={
                        () => dispatch(removefromcart({
                          id: _key,
                        }))
                      }>
                        -
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button className='button' 
                      onClick={
                        () => dispatch(removefromcart({
                          id: _key,
                        }))
                      }>
                        ❌ Remove
                      </button>
                    </div>
                  )
                }
              </div>
            </div>
          )
        })}
        </div>
        <div className='column is-8' style={{ marginTop: '20px' }}>
          <div>Total $ {total}</div>
          <button onClick={checkout} className="button is-link" disabled={total == 0}>Checkout</button>
        </div>
      </div>
    </div>
  )
}