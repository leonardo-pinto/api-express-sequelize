export const bookSchema = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number'
    },
    data: {
      type: 'object',
      properties: {
        id: {
          type: 'number'
        },
        title: {
          type: 'string'
        },
        subject: {
          type: 'string'
        },
        author: {
          type: 'string'
        },
        publisher: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        numberOfPages: {
          type: 'number'
        },
      }
    }
  }
}