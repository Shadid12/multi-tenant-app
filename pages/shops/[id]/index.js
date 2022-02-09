import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";

const FindShopById = `
query FindShopById($id: ID!) { 
  findStoreByID(id: $id) {
    _id
    name
    category
    products {
      data {
        _id
        price
        name
        image
      }
    }
  }
}
`

export default function Shop() {

  const router = useRouter();
  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: FindShopById,
    variables: { id: router.query.id },
  });

  console.log('router.query.id', data);

  if(fetching) { 
    return <p>Loading...</p>;
  }

  if(error) { 
    return <p>{error.message}</p>;
  }

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <div className="title is-4">{data.findStoreByID.name}</div>
      <div className="tile is-ancestor" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          data.findStoreByID.products.data.map(product => (
            <div className="tile is-vertical is-3" style={{ padding: '10px' }} key={product._id}>
              <div className="tile">
                <div className="tile is-child box">
                  <div>
                    <img src={`${product.image}`} style={{ maxWidth: '200px' }}/>
                  </div>
                  <div>{product.name}</div>
                  <div>$ {product.price}</div>
                  <button>Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}