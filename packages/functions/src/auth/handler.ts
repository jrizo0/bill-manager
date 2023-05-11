import { ApiHandler } from 'sst/node/api'
import { SessionValue, useSession } from 'sst/node/future/auth'

export default function handler(lambda: any) {
  return ApiHandler(async (event: any) => {
    let body, statusCode

    try {
      // Authentication
      const session: SessionValue = useSession()
      if (session.type !== 'user') {
        throw new Error('Not authenticated')
      }

      // Run the Lambda
      body = await lambda(event, session)
      statusCode = 200
    } catch (e: any) {
      console.error('Error api call:', e)
      body = { error: e.message }
      statusCode = 500
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      // body: body,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
    }
  })
}
