import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "urql";
import styles from '../styles/Products.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, selectCount } from "../src/features/cart/cartSlice";


const GetProducts = `
  query GetProducts($size: Int!) { 
    products(_size: $size) {
      data {
        _id
        name
        price
        image
        store {
          name
        }
      }
      after
      before
    }
  }
`


export default function Dashboard() {

  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  console.log('count', count);
  
  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: GetProducts,
    variables: { size: 10 },
  });

  useEffect(() => {
    if(!data) {
      reexecuteQuery({ size: 10 });
    }
  }, [data])

  console.log('data', data);

  if(fetching) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px' }}>
      {data?.products?.data.map(product => (
        <div className="tile is-3 is-parent" key={product._id}>
          <div className="tile is-child box">
            <p className="title is-4">{product.name}</p>
            <img src={product.image} alt="" className={styles.productImage}/>
            <div className={styles.buttonWrap}>
              <button className="button">🛒 Add to Cart</button>
              <Link href="/shops/new">
                <a className="button">View</a>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div>
        <div>Redux Test</div>
        <p>{count}</p>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>

    </div>
  )
}