import paths from './paths'
import schemas from './schemas'
import components from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'api-express-sequelize',
    description: 'Library system app',
    version: '1.0'
  },
  servers: [
    {
      url: '/api/v1'
    }
  ],
  tags: [
    {
      name: 'Login'
    },
    {
      name: 'Books'
    },
    {
      name: 'Rentals'
    }
  ],
  paths,
  schemas,
  components
}