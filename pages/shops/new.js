import { getSession } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "urql";
import { client } from "../../src/gqlClient";
import { UserQuery } from "../index";


const CreateStore = `
  mutation CreateStore($name: String!, $ownerId: ID!, $category: [String!]) {
    createStore(data: {
      name: $name,
      category: $category
      owner: {
        connect: $ownerId
      }
    }) {
      _id
      name
      category
      owner {
        _id
      }
    }
  }
`

export default function NewShop({ accessToken, userInfo}) {
  const router = useRouter();
  const [state, setState] = useState({
    name: '',
    category: '',
  });

  const [{fetching, data, error}, executeMutation] = useMutation(CreateStore);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const submitform = e => {
    e.preventDefault();
    executeMutation({
      name: state.name,
      ownerId: userInfo._id,
      category: state.category.split(','),
    }).then(data => {
      alert('Successfully created a new store');
      router.push('/shops');
    }).catch(err => {
      console.log(err);
     })
  }

  if(fetching) return <p>Loading...</p>

  return (
    <div className="container">
      <div className="column is-four-fifths">
        <form onSubmit={submitform}>
          <label>Store Name:
            <input
              type="text" 
              value={state.name}
              name="name"
              className="input is-primary"
              onChange={handleChange}
            />
          </label>
          <label>Category seperated by commas:
            <input
              type="text" 
              value={state.category}
              name="category"
              className="input is-primary"
              onChange={handleChange}
            />
          </label>
          <div style={{ marginTop: '20px' }}>
            <button className="button is-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res);
  const { accessToken, user } = session;

  if(!session) { 
    return {
      props: {
        error: 'UnAuthorized'
      }
    }
  }

  const serverClient = client(accessToken);

  const userInfo = await serverClient.query(UserQuery, { sub: user.sub }).toPromise();
  console.log('Current User Info', userInfo.data);

  return {
    props: {
      accessToken,
      userInfo: userInfo.data.userBySub
    },
  }
}