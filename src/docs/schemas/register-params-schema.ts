export const registerParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    role: {
      type: 'string'
    }
  },
  required: ['email', 'password', 'firstName', 'lastName', 'role']
}