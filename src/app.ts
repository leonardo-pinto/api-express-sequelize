import express from 'express'
import setupMiddlewares from './config/middlewares'
import setupRoutes from './config/routes'
import errorsMiddleware from './middlewares/errors'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
app.use(errorsMiddleware)
export default app
