import TestsHelper from '../tests-helper'
import request from 'supertest'
import User from '../../src/models/user'
import { JwtUtils } from '../../src/utils/jwt-utils'

describe('Login Controller', () => {

  let app

  beforeAll(async () => {
    await TestsHelper.startDb()
    app = await TestsHelper.getApp()
  })

  afterAll(async () => {
    await TestsHelper.stopDb()
  })

  beforeEach(async () => {
    await TestsHelper.syncDb()
  })

  describe('register()', () => {

    test('Should return 400 if request has missing parameters', async () => {
      const response = await request(app).post('/api/v1/register')
      .send({
        email: 'test@example.com',
        firstName: 'any_firstName',
        lastName: 'any_lastName',
        role: 'admin'
      }).expect(400)

      expect(response.body.error.message).toEqual('Request validation failed')
      expect(response.body.error.errors[0]).toEqual('password must be a string')
      expect(response.body.error.errors[1]).toEqual('password should not be empty')
      expect(response.body.error.stack).toEqual(expect.any(String))
    })

    test('Should register a new user successfully', async () => {
      const response = await request(app)
      .post('/api/v1/register')
      .send({
        email: 'test@example.com',
        password: 'any_password',
        firstName: 'Leonardo',
        lastName: 'Pinto',
        role: 'admin'
      })

      expect(response.statusCode).toEqual(201)
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
      await TestsHelper.createNewUser()
      const response = await TestsHelper.createNewUser()

      expect(response.statusCode).toEqual(400)
      expect(response.body.error.message).toEqual('Email already in use')
      expect(response.body.error.stack).toEqual(expect.any(String))
    })

    test('Should return 500 if findOne throws', async () => {
      jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
        throw new Error()
      })

      const response = await TestsHelper.createNewUser()

      expect(response.statusCode).toEqual(500)
      expect(response.body.error.message).toEqual(expect.any(String))
      expect(response.body.error.stack).toEqual(expect.any(String))
    })

    test('Should return 500 if generateAccessToken throws', async () => {
      jest.spyOn(JwtUtils, 'generateAccessToken').mockImplementationOnce(() => {
        throw new Error()
      })

      const response = await TestsHelper.createNewUser()

      expect(response.statusCode).toEqual(500)
      expect(response.body.error.message).toEqual(expect.any(String))
      expect(response.body.error.stack).toEqual(expect.any(String))
    })
  })

  describe('login()', () => {

    test('Should return 400 if request has missing parameters', async () => {
      const response = await request(app).post('/api/v1/register')
        .send({
          email: 'test@example.com'
        }).expect(400)

      expect(response.body.error.message).toEqual('Request validation failed')
      expect(response.body.error.errors).toEqual(expect.any(Array))
      expect(response.body.error.stack).toEqual(expect.any(String))
    })
    test('Should return an access token if login is valid', async () => {
      await TestsHelper.createNewUser()

      const response = await request(app).post('/api/v1/login')
      .send({
        email: 'test@example.com',
        password: 'any_password',
      }).expect(200)

      expect(response.body.data.accessToken).toEqual(expect.any(String))
    })

    test('Should return 401 if login is invalid', async () => {
      await TestsHelper.createNewUser()

      const response = await request(app).post('/api/v1/login')
      .send({
        email: 'test@example.com',
        password: 'invalid_password',
      }).expect(401)

      expect(response.body.error.message).toEqual(expect.any(String))
      expect(response.body.error.stack).toEqual(expect.any(String))
    })
  })
})

