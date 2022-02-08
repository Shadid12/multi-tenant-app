import '../styles/globals.css'
import Layout from '../components/layout';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider } from "urql";
import { client } from '../src/gqlClient';
import { useEffect, useState } from 'react';
import store from '../src/store';
import { Provider as ReduxProvider } from 'react-redux';


function MyApp({ Component, pageProps }) {

  const [token, setToken] = useState(null);
  
  useEffect(() => {
    fetchToken();
  },[]);

  const fetchToken = async () => { 
    try {
      const response = await fetch('/api/token');	
      const { accessToken } = await response.json();
      setToken(accessToken); 
    } catch (error) {
      setToken(process.env.NEXT_PUBLIC_FAUNA_KEY)
    }
  }

  if(!token) { 
    return null;
  }

  const clientWithToken = client(token);

  return (
      <UserProvider>
        <Provider value={clientWithToken}>
          <ReduxProvider store={store}>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </ReduxProvider>
        </Provider>
      </UserProvider>
  )
}

export default MyApp;