export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'Login a registered user',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/login'
          },
          example: {
            email: 'email@mail.com',
            password: 'password'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accessToken'
            }
          }
        }
      },
    }
  }
}