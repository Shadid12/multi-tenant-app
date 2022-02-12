import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "urql";
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

const DeleteProduct = `
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      _id
    }
  }
`

export default function Products() {

  const router = useRouter();
  
  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: ProductsByShop,
    variables: { id: router.query.id },
  });

  const [deleteProductResult, deleteProduct] = useMutation(DeleteProduct);



  const deleteCurrentProduct = async (id) => {
    deleteProduct({
      id,
    }).then((res) => {
      if(res.data) {
        alert('Product delete')
        // router.push('/shops')
        reexecuteQuery();
      }
      if(res.error) {
        alert('you can not delete this product')
      }
    })
  }

  if(fetching) {
    return <p>Loading...</p>;
  }
  
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

                <div style={{ marginTop: '20px' }}>
                  <button onClick={() => deleteCurrentProduct(product._id)} className="button is-danger is-light">Delete Product</button>
                </div>

              </div>
              {/*  */}
            </div>
          ))
        }
      </div>
    </div>
  )
}