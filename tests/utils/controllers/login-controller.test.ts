import TestsHelper from '../../tests-helper'
import request from 'supertest'
import User from '../../../src/models/user'
import JwtUtils from '../../../src/utils/jwt-utils'

describe('Login Controller', () => {

  let app

  beforeAll(async () => {
    await TestsHelper.startDb()
    app = await TestsHelper.getApp()
  })

  afterAll(async () => {
    await TestsHelper.stopDb()
  });

  beforeEach(async () => {
    await TestsHelper.syncDb()
  });

  describe('register()', () => {

    test('Should register a new user successfully', async () => {
      const response = await request(app).post('/api/v1/register')
        .send({
          email: 'test@example.com',
          password: 'any_password',
          firstName: 'Leonardo',
          lastName: 'Pinto',
          role: 'admin'
        }).expect(200)

      const users = await User.findAll()
      expect(users.length).toEqual(1)
      expect(users[0].id).toEqual(1)
      expect(users[0].email).toEqual('test@example.com')
      expect(users[0].firstName).toEqual('Leonardo')
      expect(users[0].lastName).toEqual('Pinto')
      expect(users[0].role).toEqual('admin')
      expect(response.body.data.accessToken).toEqual(expect.any(String))
    })

    test('Should return 400 if email is already in use', async () => {
      await request(app).post('/api/v1/register')
      .send({
        email: 'test@example.com',
        password: 'any_password',
        firstName: 'Leonardo',
        lastName: 'Pinto',
        role: 'admin'
      }).expect(200)

      const response = await request(app).post('/api/v1/register')
      .send({
        email: 'test@example.com',
        password: 'any_password',
        firstName: 'Leonardo',
        lastName: 'Pinto',
        role: 'admin'
      }).expect(400)

      expect(response.body.error.name).toEqual('EmailInUseError')
      expect(response.body.error.message).toEqual('The provided email is already in use')
    });

    test('Should return 500 if findOne throws', async () => {
      jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
        throw new Error()
      })

      const response = await request(app).post('/api/v1/register')
      .send({
        email: 'test@example.com',
        password: 'any_password',
        firstName: 'Leonardo',
        lastName: 'Pinto',
        role: 'admin'
      })

      expect(response.statusCode).toEqual(500)
      expect(response.body.error.name).toEqual(expect.any(String))
      expect(response.body.error.message).toEqual(expect.any(String))
    })

    test('Should return 500 if generateAccessToken throws', async () => {
      jest.spyOn(JwtUtils, 'generateAccessToken').mockImplementationOnce(() => {
        throw new Error()
      })

      const response = await request(app).post('/api/v1/register')
      .send({
        email: 'test@example.com',
        password: 'any_password',
        firstName: 'Leonardo',
        lastName: 'Pinto',
        role: 'admin'
      })

      expect(response.statusCode).toEqual(500)
      expect(response.body.error.name).toEqual(expect.any(String))
      expect(response.body.error.message).toEqual(expect.any(String))
    })
  })

  describe('login()', () => {
    test('Should return an access token if login is valid', async () => {
      await request(app).post('/api/v1/register')
        .send({
          email: 'test@example.com',
          password: 'any_password',
          firstName: 'Leonardo',
          lastName: 'Pinto',
          role: 'admin'
        }).expect(200)

      const response = await request(app).post('/api/v1/login')
      .send({
        email: 'test@example.com',
        password: 'any_password',
      }).expect(200)

      expect(response.body.data.accessToken).toEqual(expect.any(String))
    })

    test('Should return 401 if login is invalid', async () => {
      await request(app).post('/api/v1/register')
        .send({
          email: 'test@example.com',
          password: 'any_password',
          firstName: 'Leonardo',
          lastName: 'Pinto',
          role: 'admin'
        }).expect(200)

      const response = await request(app).post('/api/v1/login')
      .send({
        email: 'test@example.com',
        password: 'invalid_password',
      }).expect(401)

      expect(response.body.error.name).toEqual('Unauthorized')
      expect(response.body.error.message).toEqual('Unauthorized Error')
    })
  })
})

