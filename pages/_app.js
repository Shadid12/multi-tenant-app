import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
    </Layout>
  )
}

export default MyApp;