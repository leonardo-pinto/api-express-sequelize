export const rentParamsSchema = {
  type: 'object',
  properties: {
    bookId: {
      type: 'string'
    }
  },
  required: ['bookId']
}