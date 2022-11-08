import { Request, Response, NextFunction } from 'express'
import { ForbiddenError, UnauthorizedError } from '../utils/api-error'
import { JwtUtils, JwtData } from '../utils/jwt-utils'

export class Auth {
  static handle = (role: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization

      if (authHeader) {
        const [bearer, accessToken] = authHeader.split(' ')
        if (bearer.toLowerCase() !== 'bearer' || !accessToken) {
          next(new UnauthorizedError('Bearer token malformed'))
        }
        try {
          const jwt = JwtUtils.verifyAccessToken(accessToken) as JwtData
          req.userId = jwt.id
          req.role = jwt.role
          if (role && !role.includes(jwt.role)) {
            next(new ForbiddenError('User dont have permission to access this resource'))
          }
          next()
        } catch (error) {
          next(new UnauthorizedError('Invalid access token'))
        }
      } else {
        next(new UnauthorizedError('Authorization header not found'))
      }
    }
  }
}