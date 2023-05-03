const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  apiGateway: {
    URL: process.env.NEXT_PUBLIC_API_URL,
    REGION: process.env.NEXT_PUBLIC_REGION,
  },
};

export default config;
