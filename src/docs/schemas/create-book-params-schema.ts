export const createBookParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    subject: {
      type: 'string'
    },
    author: {
      type: 'string'
    },
    publisher: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    numberOfPages: {
      type: 'number'
    },

  },
  required: ['title', 'subject', 'author']
}