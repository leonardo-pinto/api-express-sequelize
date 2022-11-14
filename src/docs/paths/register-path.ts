export const registerPath = {
  post: {
    tags: ['Login'],
    summary: 'Register a new user',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/register'
          },
          example: {
            email: 'email@mail.com',
            password: 'password',
            firstName: 'John',
            lastName: 'Doe',
            role: 'admin'
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
              $ref: '#/schemas/accessToken'
            }
          }
        }
      }
    }
  }
}