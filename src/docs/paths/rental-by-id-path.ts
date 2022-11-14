export const rentalByIdPath = {
  get: {
    tags: ['Rentals'],
    summary: 'Find rent by id',
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
      201: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/rental'
            }
          }
        }
      }
    }
  }
}