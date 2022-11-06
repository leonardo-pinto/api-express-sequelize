import { Request } from 'express'
import User from '../models/user'
import { BadRequestError, UnauthorizedError } from '../utils/api-error'
import JwtUtils from '../utils/jwt-utils'
import { SuccessResponse } from '../utils/success-response'

export default class LoginController {

  async register(req: Request) {
    const {
      email,
      password,
      firstName,
      lastName,
      role
    } = req.body

    const user = await User.findOne({ where: { email } })

    if (user) {
      return new BadRequestError('Email already in use')
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

    return new SuccessResponse({ accessToken })
  }

  async login(req: Request) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user || !(await User.comparePasswords(password, user.password))) {
      return new UnauthorizedError()
    }

   const accessToken = JwtUtils.generateAccessToken(email)

   return new SuccessResponse({ accessToken })
  }
}