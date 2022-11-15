import { Request } from 'express'

export const mockLoginRequest = () => ({
  ...{
    body: {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
  }
}) as Request