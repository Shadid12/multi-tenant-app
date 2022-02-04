import '../styles/globals.css'
import Layout from '../components/layout';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>

  )
}

export default MyApp;