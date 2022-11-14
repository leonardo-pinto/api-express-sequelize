import express from 'express'
import setupMiddlewares from './config/middlewares'
import setupRoutes from './config/routes'
import setupSwagger from './config/swagger'
import errorHandler from './middlewares/error-handler'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
app.use(errorHandler.handle())
export default app
