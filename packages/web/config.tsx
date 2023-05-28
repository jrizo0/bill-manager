const config = {
  MAX_ATTACHMENT_SIZE: 1000000,
  apiGateway: {
    URL: process.env.NEXT_PUBLIC_API_URL,
    REGION: process.env.NEXT_PUBLIC_REGION,
  },
  auth: {
    URL: process.env.NEXT_PUBLIC_AUTH_URL,
  },
  s3: {
    REGION: process.env.NEXT_PUBLIC_REGION,
    BUCKET: process.env.NEXT_PUBLIC_BUCKET,
  },
}

export default config
