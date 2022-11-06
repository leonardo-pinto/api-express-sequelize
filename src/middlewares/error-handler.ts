import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/api-error'

export default class ErrorHandler {
  static handle = () => {
    return async (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
      const statusCode = err.statusCode || 500
      console.error('error occurred: ', err.toString(), statusCode)
      res.status(statusCode).send({
        error: {
          message: err.message,
          errors: err.errors ?? [],
          stack: err.stack
        }
      })
    }
  }
}