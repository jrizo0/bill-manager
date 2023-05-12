import AppBar from '@/components/AppBar'
import Layout from '@/components/Layout'
import config from '@/config'
import { TokenProvider } from '@/context/session'
import '@/styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Amplify } from 'aws-amplify'
import type { AppProps } from 'next/app'
import '../styles/Home.css'

export default function App({ Component, pageProps }: AppProps) {
  // AMPLIFY CONFIGURE
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

  // RETURN COMPONENT
  return (
    <TokenProvider>
      <Layout>
        <AppBar />
        <Component {...pageProps} />
      </Layout>
    </TokenProvider>
  )
}
