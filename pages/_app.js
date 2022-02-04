import '../styles/globals.css'
import Layout from '../components/layout';
import { UserProvider } from '@auth0/nextjs-auth0';
import { Provider } from "urql";
import { client } from '../src/gqlClient';

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <UserProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </Provider>

  )
}

export default MyApp;