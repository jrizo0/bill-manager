import { User } from '@bill-manager/core/user'
import { Config } from 'sst/node/config'
import { AuthHandler, GoogleAdapter } from 'sst/node/future/auth'

declare module 'sst/node/future/auth' {
  export interface SessionTypes {
    user: {
      userID: string
    }
  }
}

const onError = () => {
  throw new Error('Error on authentication')
}

export const handler = AuthHandler({
  clients: async () => ({
    local: 'http://localhost',
  }),
  providers: {
    google: GoogleAdapter({
      mode: 'oidc',
      clientID: Config.GOOGLE_CLIENT_ID,
    }),
  },

  async onAuthorize() {},

  async onSuccess(input) {
    let user = undefined

    if (input.provider === 'google') {
      const claims = input.tokenset.claims()

      const params = {
        email: claims.email ?? onError(),
        userID: claims.sub,
        name: claims.name ?? onError(),
      }
      user = await User.login(params)

      return {
        type: 'user',
        properties: {
          userID: user.userID,
        },
      }
    }

    throw new Error('Unknown provider')
  },

  async onError() {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'Auth failed',
    }
  },
})
