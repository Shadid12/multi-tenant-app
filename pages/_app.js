import '../styles/globals.css'
import Layout from '../components/layout';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider } from "urql";
import { client } from '../src/gqlClient';
import { Auth0Provider } from '@auth0/auth0-react';


function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider value={client}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </UserProvider>
  )
}

export default MyApp;