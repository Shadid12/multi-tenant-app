import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "urql";
import styles from '../styles/Stores.module.css';


const GetStores = `
  query GetStores($size: Int!) { 
    stores(_size: $size) {
      data {
        _id
        name
        image
        category
        owner {
          username
        }
      }
      after
      before
    }
  }
`


export default function Dashboard() {
  
  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: GetStores,
    variables: { size: 100 },
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
    {error ? (
      <div className="notification is-danger">
        {error.message}
      </div>
    ) : null}

      {data?.stores?.data.map(shop => (
        <div className="tile is-4 is-parent" key={shop._id}>
          <div className="tile is-child box">
            <p className="title is-4">{shop.name}</p>
            <img src={shop.image ? shop.image : 'https://cdn.pixabay.com/photo/2019/08/27/04/18/store-icon-4433328_1280.png'} alt="" className={styles.productImage}/>
            <div className={styles.buttonWrap}>
              <Link href={`/shops/${shop._id}`}>
                <a className="button">View Store</a>
              </Link>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
}