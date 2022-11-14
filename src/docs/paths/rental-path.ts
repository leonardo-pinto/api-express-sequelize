export const rentalPath = {
  post: {
    tags: ['Rentals'],
    summary: 'Creates a new book rent',
    security: [
      {
        bearerAuthSchema: []
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/rentBook'
          },
          example: {
            bookId: '1'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/success'
            }
          }
        }
      }
    }
  }
}