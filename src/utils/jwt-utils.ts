import jwt from 'jsonwebtoken'
import env from '../config/environment'

export type JwtData = {
  id: number
  role: string
}

export class JwtUtils {

  static generateAccessToken(payload: JwtData) {
    return jwt.sign(payload, env.jwtSecret)
  }

  static verifyAccessToken(accessToken: string) {
    return jwt.verify(accessToken, env.jwtSecret)
  }
}