import { ClassConstructor, plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response } from 'express'
import { validate } from 'class-validator'
import { BadRequestError } from '../utils/api-error'

export default class RequestValidator {
  static validate = <T extends object> (classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToInstance(classInstance, req.body)
      await validate(convertedObject).then((errors) => {
        if (errors.length > 0) {
          let rawErrors: string[] = []
          for (const errorItem of errors) {
            rawErrors = rawErrors.concat(...rawErrors, Object.values(errorItem.constraints ?? []))
          }

          next(new BadRequestError(
            'Request validation failed',
            rawErrors
          ))
        }
      })
      next()
    }
  }
}