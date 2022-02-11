import Link from "next/link";
import ShopItem from "../../components/shopItem";
import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQuery } from "urql";
import { useEffect } from "react";
import styles from '../../styles/Stores.module.css';

export const GetMyShops = `
  query GetMyShops($sub: String!) {
    userBySub(sub: $sub) {
      _id
      email
      sub
      stripeAccount
      stores {
        data {
         _id
         name
         category
         image
        }
      }
    }
  }
`;

const UpdateUser = `
  mutation UpdateUser(
    $id: ID!, 
    $stripeAccount: String!
    $email: String!
    $sub: String!
  ) {
    updateUser(id: $id, data: {
      stripeAccount: $stripeAccount
      email: $email
      sub: $sub
    }) {
      _id
      stripeAccount
    }
  }
`;

export default function MyShops() {
  const { user } = useUser();

  useEffect(() => {
    if(user?.sub) {
      reexecuteQuery({ sub: user.sub });
    }
  }, [user]);

  const [{fetching, data, error}, reexecuteQuery] = useQuery({
    query: GetMyShops,
    variables: { sub: user?.sub },
  });


  const [updateUserResult, updateUserMutation] = useMutation(UpdateUser);

  if(fetching) return <p>Loading...</p>;

  const activateSellerProfile = async () => {
    const response = await fetch('/api/stripe/create-account');
    const accountData = await response.json();

    console.log('accountData', data);

    const { email, sub } = data.userBySub;

    updateUserMutation({
      id: data?.userBySub._id,
      stripeAccount: accountData.account.id,
      email,
      sub,
    }).then(res => {
      console.log('res', res);
      alert('user updated');
      reexecuteQuery({ sub: user?.sub });
    });
  }

  if(!data?.userBySub?.stripeAccount) {
    return (
      <div className="container">
        <h1 className="title is-8">Activate your seller profile</h1> 
        <button className="button is-info is-light" onClick={activateSellerProfile}>Activate</button>
      </div>
    )
  }


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
              <ShopItem store={store}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}