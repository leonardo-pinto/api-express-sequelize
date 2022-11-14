export const rentalByBookPath = {
  get: {
    tags: ['Rentals'],
    summary: 'Find all rentals by book',
    security: [
      {
        bearerAuthSchema: []
      }
    ],
    parameters: [
      {
        in: 'path',
        name: 'bookId',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      201: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/rentals'
            }
          }
        }
      }
    }
  }
}