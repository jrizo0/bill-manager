import { AuthHandler, GoogleAdapter, Session } from 'sst/node/auth'
import { User } from '@bill-manager/core/user'
import { NextjsSite } from 'sst/node/site'

const GOOGLE_CLIENT_ID =
  '195873238234-efgj96f3rfald5apgpa8oqm3ntl8q0es.apps.googleusercontent.com'

declare module 'sst/node/auth' {
  export interface SessionTypes {
    user: {
      userID: string
    }
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: 'oidc',
      clientID: GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims()

        const params = {
          userID: claims.sub,
          email: claims.email ?? '',
          pictureURL: claims.picture ?? '',
          name: claims.given_name ?? '',
        }
        const user = await User.create(params)

        const url =
          NextjsSite.Site.url === 'localhost'
            ? 'http://127.0.0.1:3000'
            : NextjsSite.Site.url
        return Session.parameter({
          redirect: url,
          type: 'user',
          properties: {
            userID: user.userId,
          },
        })
      },
    }),
  },
})
