import styles from '../styles/Home.module.css'
import { getSession } from '@auth0/nextjs-auth0';
import { client } from '../src/gqlClient';
import Dashboard from '../components/dashboard';

export const UserQuery = `
  query UserQuery($sub: String!){
    userBySub(sub: $sub) {
      _id
      username
      sub
    }
  }
`;

const CreateNewuser = `
  mutation createuser($username: String!, $sub: String!, $email: String!) {
    createUser(
      data: {
        username: $username
        sub: $sub
        email: $email
      }
  ) {
    _id
    }
  }
`

export default function Home() {

  return (
    <div className={styles.main}>
      <div className="columns">
        <div className="column is-2">
          <input className="input is-link" type="text" placeholder="Search Store" />
          <button className="button is-link">Search</button>
        </div>
        <Dashboard />
      </div>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res);

  if(!session) { 
    return {
      props: {}
    }
  }

  const { user, accessToken } = session;
  const serverClient = client(accessToken);
  const userInfo = await serverClient.query(UserQuery, { sub: user.sub }).toPromise();
  
  if(!userInfo.data?.userBySub) {
    // User not found Create a new user
    console.log('User not found, creating a new user', user);
    const newUser = await serverClient.mutation(CreateNewuser, { 
      username: user.given_name ? user.given_name : user.name,
      email: user.nickname,
      sub: user.sub
    }).toPromise();

    console.log('New user created', newUser.error);

    return {
      props: {
        userInfo: newUser.data ? newUser.data.createUser : null
      }
    }
  }
  
  return {
    props: {
      userInfo: userInfo.data ? userInfo.data.userBySub : null
    }
  }
}