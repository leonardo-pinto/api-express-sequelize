export const bookResultSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number'
    },
    data: {
      type: 'array',
      items: {
        $ref: '#/schemas/book'
      }
    }
  }
}