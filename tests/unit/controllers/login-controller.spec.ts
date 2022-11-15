import { Request } from 'express'
import LoginController from '../../../src/controllers/login-controller'
import User from '../../../src/models/user'
import { BadRequestError, UnauthorizedError } from '../../../src/utils/api-error'
import { JwtUtils } from '../../../src/utils/jwt-utils'
import { SuccessResponse } from '../../../src/utils/success-response'
import {
  mockRegisterRequest,
  mockLoginRequest,
  mockUser
} from '../mocks'

describe('Login Controller Unit tests', () => {
  describe('register()', () => {

    let loginControllerStub: LoginController
    let payload: Request

    beforeEach(() => {
      loginControllerStub = new LoginController()
      payload = mockRegisterRequest()
      jest.spyOn(User, 'findOne').mockResolvedValue(null)
      jest.spyOn(User, 'create').mockResolvedValue(mockUser())
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should return 400 if email is already in use', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUser())
      const result = await loginControllerStub.register(payload)
      expect(result).toEqual(new BadRequestError('Email already in use'))
    })

    test('Should call create method with correct values', async () => {
      const userCreateSpy = jest.spyOn(User, 'create')
      await loginControllerStub.register(payload)

      expect(userCreateSpy).toHaveBeenCalledTimes(1)
      expect(userCreateSpy).toHaveBeenCalledWith({
        email: 'any_email@mail.com',
        password: 'any_password',
        firstName: 'any_firstName',
        lastName: 'any_lastName',
        role: 'admin'
      })
    })

    test('Should return an access token', async () => {
      const generateAccessTokenSpy = jest.spyOn(JwtUtils, 'generateAccessToken')
        .mockReturnValue('access_token')
      const result = await loginControllerStub.register(payload)

      expect(generateAccessTokenSpy).toHaveBeenCalledWith({ id: '1', role: 'admin' })
      expect(result).toEqual(new SuccessResponse(201, { accessToken: 'access_token' }))
    })
  })

  describe('login()', () => {
    let loginControllerStub: LoginController
    let payload: Request

    beforeEach(() => {
      loginControllerStub = new LoginController()
      payload = mockLoginRequest()
      jest.spyOn(User, 'findOne').mockResolvedValue(mockUser())
      jest.spyOn(User, 'comparePasswords').mockResolvedValue(true)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should return 401 if user is not found', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null)
      const result = await loginControllerStub.login(payload)

      expect(result).toEqual(new UnauthorizedError('Invalid credentials'))
    })

    test('Should return 401 if comparePasswords returns false', async () => {
      jest.spyOn(User, 'comparePasswords').mockResolvedValueOnce(false)
      const result = await loginControllerStub.login(payload)

      expect(result).toEqual(new UnauthorizedError('Invalid credentials'))
    })

    test('Should return an accessToken', async () => {
      const generateAccessTokenSpy = jest.spyOn(JwtUtils, 'generateAccessToken')
      .mockReturnValue('access_token')
      const result = await loginControllerStub.login(payload)

      expect(generateAccessTokenSpy).toHaveBeenCalledWith({ id: '1', role: 'admin' })
      expect(result).toEqual(new SuccessResponse(200, { accessToken: 'access_token' }))
    })
  })
})