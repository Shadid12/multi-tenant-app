import Link from "next/link";
import { useEffect, useState } from "react";
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

const SearchStore = `
query SearchShops($term: String!) {
  searchStoreByNamePartial(term: $term) {
    _id
    image
    name
    category
  }
}
`


export default function Dashboard() {

  const [searchTerm, setSearchTerm] = useState("");
  const [shops, setShops] = useState([]);
  
  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: GetStores,
    variables: { size: 100 },
  });

  const [searchResult, executeSearch] = useQuery({
    query: SearchStore,
    variables: { term: searchTerm.toLocaleLowerCase() },
    pause: true
  });

  useEffect(() => {
    if(data?.stores?.data) {
      setShops(data.stores.data)
    }
    if(searchResult?.data?.searchStoreByNamePartial) {
      console.log('===>', searchResult.data.searchStoreByNamePartial)
      setShops(searchResult.data.searchStoreByNamePartial)
    }
  }, [data, searchResult]);

  if(fetching) {
    return <p>Loading...</p>;
  }

  return (
    <>
      
      <div className="column is-2">
        <input 
          className="input is-link" 
          type="text" 
          placeholder="Search Store" 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="button is-link" onClick={
          () => {
            console.log('asdw')
            executeSearch();
          }
        }>Search</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px' }}>
      {error ? (
        <div className="notification is-danger">
          {error.message}
        </div>
      ) : null}

        {shops.map(shop => (
          <div className="tile is-4 is-parent" key={shop._id}>
            <div className="tile is-child box">
              <p className="title is-4">{shop.name}</p>
              <img src={shop.image ? shop.image : 'https://cdn.pixabay.com/photo/2019/08/27/04/18/store-icon-4433328_1280.png'} alt="" className={styles.productImage}/>
              <div className={styles.buttonWrap}>
                <Link href={`/shops/${shop._id}`}>
                  <a className="button">View Store</a>
                </Link>
              </div>
              {
                shop.category.map( item => 
                  <span 
                    key={item} 
                    className="tag is-link is-light" 
                    style={{ margin: '1px' }}
                  >
                    {item} 
                  </span>
                )
              }
            </div>
          </div>
        ))}
      </div>
    </>
  )
}