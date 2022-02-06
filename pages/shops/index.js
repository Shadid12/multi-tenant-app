import Link from "next/link";
import StoreItem from "../../components/storeItem";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "urql";
import { useEffect } from "react";
import styles from '../../styles/Stores.module.css';

export const GetMyShops = `
  query GetMyShops($sub: String!){
    userBySub(sub: $sub) {
      _id
      stores {
        data {
         _id
         name
         category
        }
      }
    }
  }
`;

export default function MyShops() {
  const { user } = useUser();

  useEffect(() => {
    if(user?.sub) {
      console.log('User found', user);
      reexecuteQuery({ sub: user.sub });
    }
  }, [user]);

  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: GetMyShops,
    variables: { sub: user?.sub },
  });

  if(fetching) return <p>Loading...</p>;

  console.log('data', data);

  return (
    <div className="container">
      <Link href="/shops/new">
        <a className="button is-success">Create a new shop</a>
      </Link>
      <h1 className="title is-8">My Shops</h1>
      <div className={styles.shopContainer}>
        {
          data?.userBySub?.stores?.data?.map(store => (
            <div className="tile is-4 is-vertical is-parent" key={store._id}>
              <StoreItem store={store}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}