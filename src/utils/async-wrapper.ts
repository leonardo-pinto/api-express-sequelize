import { Request, Response, NextFunction } from 'express'

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const asyncWrapper = (handler: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(handler(req, res, next))
    .then((response: any) => {
      if (response.statusCode <= 299) {
        res.status(response.statusCode).send(response)
      } else {
        res.status(response.statusCode).send({
          error: {
            message: response.message,
            stack: response.stack
          }
        })
      }
    })
    .catch((err) => next(err))
}