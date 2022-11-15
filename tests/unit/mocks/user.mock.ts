import User from '../../../src/models/user'

export const mockUser = () => ({
  ...{
    id: '1',
    email: 'any_email@mail.com',
    password: 'any_password',
    firstName: 'any_firstName',
    lastName: 'any_lastName',
    role: 'admin'
  }
}) as User