export const rentalByUserPath = {
  get: {
    tags: ['Rentals'],
    summary: 'Find all rentals by user',
    security: [
      {
        bearerAuthSchema: []
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