import { APIGatewayProxyEventV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { ApiHandler } from 'sst/node/api'
import { SessionValue, useSession } from 'sst/node/future/auth'

export default function handler(
  lambda: (
    event: APIGatewayProxyEventV2,
    session: {
      properties: {
        userID: string
      }
    }
  ) => Promise<{ statusCode: number; body: any }>
) {
  return ApiHandler(async (event: APIGatewayProxyEventV2) => {
    let body, statusCode

    try {
      // Authentication
      const session: SessionValue = useSession()
      if (session.type !== 'user' || !session.properties) {
        throw new Error('Not authenticated')
      }

      // Run the Lambda
      ;({ body: body, statusCode: statusCode } = await lambda(event, session))
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
