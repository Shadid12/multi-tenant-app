import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import styles from '../../../styles/Stores.module.css';


const ProductsByShop = `
  query ProductsByShop($id: ID!){
    findStoreByID(id: $id) {
      _id
      products {
        data {
          _id
          name
          price
          image
        }
      }
    }
  }
`

export default function Products() {

  const router = useRouter();
  
  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: ProductsByShop,
    variables: { id: router.query.id },
  });

  if(fetching) {
    return <p>Loading...</p>;
  }

  console.log('data', data.findStoreByID.products.data);

  return (
    <div className="container">
      <div className={styles.shopContainer}>
        {
           data?.findStoreByID?.products?.data?.map(product => (
            <div className="tile is-3 is-vertical is-parent" key={product._id}>
              {/*  */}
              <div className="tile is-child box">
                <p className="title">{product.name}</p>
                <img className={styles.productImage} src={product.image} alt={product.name}/>
                <p>$ {product.price}</p>
                <Link href={`/products/${product._id}/edit`}>
                  <a className="button is-info is-light">Update Item</a>
                </Link>
              </div>
              {/*  */}
            </div>
          ))
        }
      </div>
    </div>
  )
}