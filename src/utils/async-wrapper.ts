import { Request, Response, NextFunction } from 'express'
import { HttpResponse } from '../controllers/protocols'

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const asyncWrapper = (handler: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(handler(req, res, next))
    .then((response: HttpResponse) => {
      if (response.statusCode <= 299) {
        res.status(response.statusCode).send({ data: response.body })
      } else {
        res.status(response.statusCode).send({
          error: {
            name: response.body.name,
            message: response.body.message
          }
        })
      }
    })
    .catch((err) => next(err))
}