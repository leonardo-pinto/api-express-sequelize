export const rentalSchema = {
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
        bookId: {
          type: 'number'
        },
        userId: {
          type: 'number'
        },
        rentalDate: {
          type: 'string'
        },
        dueDate: {
          type: 'string'
        },
        returnDate: {
          type: 'string'
        },
        book: {
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
  }
}
