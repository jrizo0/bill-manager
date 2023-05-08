import { AuthHandler, GoogleAdapter } from 'sst/node/auth'

const GOOGLE_CLIENT_ID =
  '195873238234-efgj96f3rfald5apgpa8oqm3ntl8q0es.apps.googleusercontent.com'

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: 'oidc',
      clientID: GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => {
        return {
          statusCode: 200,
          body: JSON.stringify(tokenset.claims(), null, 4),
        }
      },
    }),
  },
})
