import jwt from 'jsonwebtoken'
import env from '../config/environment'

export default class JwtUtils {

  static generateAccessToken(payload: string) {
    return jwt.sign(payload, env.jwtSecret)
  }
}