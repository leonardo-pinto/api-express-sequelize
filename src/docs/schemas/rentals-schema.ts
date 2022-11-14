export const rentalsSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number'
    },
    data: {
      type: 'array',
      items: {
        $ref: '#/schemas/rental'
      }
    }
  }
}