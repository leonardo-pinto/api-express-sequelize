export const rentalReturnPath = {
  put: {
    tags: ['Rentals'],
    summary: 'Return a book rental',
    security: [
      {
        bearerAuthSchema: []
      }
    ],
    parameters: [
      {
        in: 'path',
        name: 'rentalId',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
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