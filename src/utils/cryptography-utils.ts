import bcrypt from 'bcrypt'
import env from '../config/environment'

export default class CryptographyUtils {

  static async hashPassword(password: string) {
    return bcrypt.hash(password, env.saltRounds)
  }

  static async comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }
}