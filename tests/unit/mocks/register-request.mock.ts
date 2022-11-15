import { Request } from 'express'

export const mockRegisterRequest = () => ({
  ...{
    body: {
      email: 'any_email@mail.com',
      password: 'any_password',
      firstName: 'any_firstName',
      lastName: 'any_lastName',
      role: 'admin'
    }
  }
}) as Request