export const accessTokenSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number'
    },
    data: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string'
        }
      }
    }
  }
}