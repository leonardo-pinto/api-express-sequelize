import jwt from 'jsonwebtoken'
import { JwtUtils } from '../../../src/utils/jwt-utils'

describe('Jwt Utils', () => {

  describe('generateAccessToken()', () => {
    test('Should return an access token', () => {
      const payload = { id: 1, role: 'any' }
      expect(JwtUtils.generateAccessToken(payload)).toEqual(expect.any(String))
    })
  })

  describe('verifyAccessToken()', () => {
    test('Should verify that the access token is valid', () => {
      const payload = { id: 1, role: 'any' }
      const jwt = JwtUtils.generateAccessToken(payload)
      const result = JwtUtils.verifyAccessToken(jwt)
      expect(result).toEqual(expect.objectContaining(payload))
    })

    test('Should throw error if access token is invalid', () => {
      expect(() => JwtUtils.verifyAccessToken('invalid.token')).toThrow(jwt.JsonWebTokenError)
    })
  })
})