import { Request, Response } from 'express'
import { Auth } from '../../../src/middlewares'
import { ForbiddenError, UnauthorizedError } from '../../../src/utils/api-error'
import { JwtUtils } from '../../../src/utils/jwt-utils'

describe('Auth Middleware', () => {
  describe('auth()', () => {
    const res = {} as Response
    const next = jest.fn()

    test('Should call next with correct parameters if authorization header is not found', () => {
      const mockRequest = { headers: {} } as Request

      const authHandle = Auth.handle(['admin'])
      authHandle(mockRequest, res, next)
      expect(next).toHaveBeenCalledWith(
        new UnauthorizedError('Authorization header not found')
      )
    })

    test('Should call next with correct parameters if token is malformed', () => {
      const mockRequest = { headers: { authorization: 'malformed_token' } } as Request
      const authHandle = Auth.handle(['admin'])
      authHandle(mockRequest, res, next)
      expect(next).toHaveBeenCalledWith(
        new UnauthorizedError('Bearer token malformed')
      )
    })

    test('Should call next with correct parameters if token is invalid', () => {
      const mockRequest = {
        headers: {
          authorization: 'Bearer invalid_token'
        }
      } as Request

      const authHandle = Auth.handle(['admin'])
      authHandle(mockRequest, res, next)
      expect(next).toHaveBeenCalledWith(
        new UnauthorizedError('Invalid access token')
      )
    })

    test('Should call next with correct parameters if role is invalid', () => {
      const accessToken = JwtUtils.generateAccessToken({
        id: 1,
        role: 'invalidRole'
      })

      const mockRequest = {
        body: {},
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      } as Request

      const authHandle = Auth.handle(['admin'])
      authHandle(mockRequest, res, next)
      expect(next).toHaveBeenCalledWith(
        new ForbiddenError('User dont have permission to access this resource')
      )
    })

    test('Should call next with correct parameters if token is valid', () => {
      const accessToken = JwtUtils.generateAccessToken({
        id: 1,
        role: 'admin'
      })

      const mockRequest = {
        body: {},
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      } as Request

      const authHandle = Auth.handle(['admin'])
      authHandle(mockRequest, res, next)
      expect(next).toHaveBeenCalledWith()
    })
  })
})