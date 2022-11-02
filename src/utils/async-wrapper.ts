import { Request, Response, NextFunction } from 'express'
import { HttpResponse } from '../controllers/protocols'

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

export const asyncWrapper = (handler: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(handler(req, res, next))
    .then((response: HttpResponse) => res.status(response.statusCode).send({ data: response.body }))
    .catch((err) => next(err))
}