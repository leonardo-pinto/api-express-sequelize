import { Request } from 'express'
import User from '../models/user'
import JwtUtils from '../utils/jwt-utils'
import { EmailInUseError } from './errors/email-in-use-error'
import { badRequest, HttpResponse, success, unauthorized } from './protocols'

export default class LoginController {

  async register(req: Request): Promise<HttpResponse> {
    const {
      email,
      password,
      firstName,
      lastName,
      role
    } = req.body

    const user = await User.findOne({ where: { email } })

    if (user) {
      return badRequest(new EmailInUseError())
    }

    await User.create(
      {
        email,
        password,
        firstName,
        lastName,
        role
      }
    )

    const accessToken = JwtUtils.generateAccessToken(email)

    return success({ accessToken })
  }

  async login(req: Request): Promise<HttpResponse> {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user || !(await User.comparePasswords(password, user.password))) {
      return unauthorized()
    }

   const accessToken = JwtUtils.generateAccessToken(email)

   return success({ accessToken })
  }
}