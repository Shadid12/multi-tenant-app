import Link from "next/link";
import { useQuery } from "urql";
import styles from '../styles/Products.module.css';

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
  
  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: GetProducts,
    variables: { size: 10 },
  });

  console.log('data', data);

  if(fetching) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px' }}>
      {data.products.data.map(product => (
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
    </div>
  )
}