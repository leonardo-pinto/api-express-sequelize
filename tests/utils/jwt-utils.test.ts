import JwtUtils from '../../src/utils/jwt-utils'

describe('Jwt Utils', () => {
  test('Should return an access token', () => {
    const payload = 'any_payload'
    expect(JwtUtils.generateAccessToken(payload)).toEqual(expect.any(String))
  })
})