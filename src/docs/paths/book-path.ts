export const bookPath = {
  post: {
    tags: ['Books'],
    summary: 'Creates a new book register',
    security: [
      {
        bearerAuthSchema: []
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createBookParams'
          }
        },
        example: {
          title: 'Meditations',
          subject: 'Philosophy',
          author: 'Marcus Aurelius'
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
  },
  get: {
    tags: ['Books'],
    summary: 'List all books',
    security: [
      {
        bearerAuthSchema: []
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/booksResult'
            }
          }
        }
      }
    }
  },
  delete: {
    tags: ['Books'],
    summary: 'Deletes a book register',
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