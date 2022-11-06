import express from 'express'
import setupMiddlewares from './config/middlewares'
import setupRoutes from './config/routes'
import errorHandler from './middlewares/error-handler'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
app.use(errorHandler.handle())
export default app
