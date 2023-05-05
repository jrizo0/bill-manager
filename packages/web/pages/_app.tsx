import { onError } from '@/lib/errorLib'
import '@/styles/globals.css'
import { Amplify, Auth } from 'aws-amplify'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, Navbar } from 'react-bootstrap'
import config from '../config'
import '../styles/Home.css'
import AppBar from '@/components/AppBar'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  Amplify.configure({
    API: {
      endpoints: [
        {
          name: 'bills',
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION,
        },
      ],
    },
  })

  /* EJEMPLO NOTES CON AUTH
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
  onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    nav("/login");
  }
  <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
    <Routes />
  </AppContext.Provider>

  */

  return (
    // <Layout>
    //   <Component {...pageProps} />
    // </Layout>

    <div className='App container py-3'>
      <AppBar />
      <Component {...pageProps} />
    </div>
  )
}
