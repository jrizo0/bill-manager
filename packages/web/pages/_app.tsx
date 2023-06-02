import AppBar from '@/components/AppBar'
import Layout from '@/components/Layout'
import config from '@/config'
import store from '@/store/store'
import '@/styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Amplify } from 'aws-amplify'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
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
    Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
    },
  })

  // RETURN COMPONENT
  return (
    <Provider store={store}>
      <Layout>
        <AppBar />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
