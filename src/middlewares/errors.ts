import { Request, Response, NextFunction } from 'express'

export default function errorsMiddleware (err: Error, _req: Request, res: Response, _next: NextFunction) {

  res.status(500).send({
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  })
}