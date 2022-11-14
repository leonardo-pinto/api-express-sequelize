export const rentalRenewPath = {
  put: {
    tags: ['Rentals'],
    summary: 'Renew a book rental',
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