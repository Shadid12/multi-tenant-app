import '../styles/globals.css'
import Layout from '../components/layout';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider } from "urql";
import { client } from '../src/gqlClient';
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }) {

  const [token, setToken] = useState(null);
  
  useEffect(() => {
    fetchToken();
  },[]);

  const fetchToken = async () => { 
    const response = await fetch('/api/token');	
    const { accessToken } = await response.json();
    setToken(accessToken);
  }

  if(!token) { 
    return null;
  }

  const clientWithToken = client(token);

  return (
    <UserProvider>
      <Provider value={clientWithToken}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </UserProvider>
  )
}

export default MyApp;