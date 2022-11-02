import CryptographyUtils from '../../src/utils/cryptography-utils'

describe('Cryptography Utils', () => {

  describe('hashPassword', () => {
    test('Should hash the password', async () => {
      const password = 'any_password'
      const hashedPassword = await CryptographyUtils.hashPassword(password)
      expect(password).not.toEqual(hashedPassword)
    })
  })

  describe('comparePasswords', () => {
    test('Should return true if password is correct', async () => {
      const password = 'any_password'
      const hashedPassword = await CryptographyUtils.hashPassword(password)
      const result = await CryptographyUtils.comparePasswords(password, hashedPassword)
      expect(result).toBeTruthy()
    })

    test('Should return false if password is incorrect', async () => {
      const password = 'any_password'
      const hashedPassword = await CryptographyUtils.hashPassword(password)
      const result = await CryptographyUtils.comparePasswords('invalid_password', hashedPassword)
      expect(result).toBeFalsy()
    })
  })
})