import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "urql";
import styles from '../styles/Products.module.css';
import { useDispatch } from 'react-redux';
import { addtocart } from "../src/features/cart/cartSlice";


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
  const dispatch = useDispatch();
  
  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: GetProducts,
    variables: { size: 10 },
  });

  useEffect(() => {
    if(!data) {
      reexecuteQuery({ size: 10 });
    }
  }, [data])

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
              <button className="button" onClick={
                () => dispatch(addtocart(product))
              }>🛒 Add to Cart</button>
              <Link href="/shops/new">
                <a className="button">View</a>
              </Link>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}