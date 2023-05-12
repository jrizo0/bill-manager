const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  apiGateway: {
    URL: process.env.NEXT_PUBLIC_API_URL,
    REGION: process.env.NEXT_PUBLIC_REGION,
  },
  auth: {
    URL: process.env.NEXT_PUBLIC_AUTH_URL,
  },
}

export default config
