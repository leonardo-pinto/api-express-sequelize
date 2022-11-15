import TestsHelper from '../tests-helper'
import request from 'supertest'
import Rental from '../../../src/models/rental'


describe('Rental Controller E2E tests', () => {

  let app
  let accessToken: string

  beforeAll(async () => {
    await TestsHelper.startDb()
    app = await TestsHelper.getApp()
  })

  afterAll(async () => {
    await TestsHelper.stopDb()
  })

  beforeEach(async () => {
    await TestsHelper.syncDb()
    const newUser = await TestsHelper.createNewUserRequest()
    accessToken = newUser.body.data.accessToken
    await TestsHelper.createNewBook()
  })

  describe('rent()', () => {
    test('Should create a new rent register successfully', async () => {
      const response = await TestsHelper.createNewRentRequest(accessToken)
      expect(response.statusCode).toEqual(201)
      const rentals = await Rental.findAll()
      expect(rentals).toHaveLength(1)
    })
  })

  describe('renew()', () => {
    test('Should return 400 if rental register was not found', async () => {
      const response = await TestsHelper.renewRequest(accessToken, '6')
      expect(response.statusCode).toEqual(400)
      expect(response.body.error.message).toEqual('Rental register was not found')
      expect(response.body.error.stack).toEqual(expect.any(String))
    })

    test('Should renew a rental successfully', async () => {
      await TestsHelper.createNewRentRequest(accessToken)
      const response = await TestsHelper.renewRequest(accessToken)
      expect(response.statusCode).toEqual(200)
    })
  })

  describe('return()', () => {
    test('Should return a rental successfully', async () => {
      await TestsHelper.createNewRentRequest(accessToken)
      const response = await TestsHelper.returnRentalRequest(accessToken)
      expect(response.statusCode).toEqual(200)
      const rental = await Rental.findOne({ where: { id: '1' } })
      expect(rental?.returnDate).not.toBeNull()
    })

    test('Should return 400 if rental id is invalid', async () => {
      const response = await TestsHelper.returnRentalRequest(accessToken)
      expect(response.statusCode).toEqual(400)
    })
  })

  describe('getById()', () => {

    beforeEach(async () => {
      await TestsHelper.createNewRentRequest(accessToken)
    })
    test('Should return the correct rental by id', async () => {
      const response = await request(app).get('/api/v1/rental/1')
      .set('authorization', `Bearer ${accessToken}`)
      .expect(200)

      expect(response.body.data.id).toEqual(1)
      expect(response.body.data.bookId).toEqual(1)
      expect(response.body.data.userId).toEqual(1)
      expect(response.body.data.returnDate).toBeNull()
      expect(response.body.data.book.id).toEqual(1)
      expect(response.body.data.book.title).toEqual('any_title')
      expect(response.body.data.book.subject).toEqual('any_subject')
    })

    test('Should return null if there is no rental with the given id', async () => {
      const response = await request(app).get('/api/v1/rental/3')
      .set('authorization', `Bearer ${accessToken}`)
      .expect(200)

      expect(response.body.data).toBeNull()
    })
  })

  describe('getByUserId()', () => {

    test('Should return the correct rental array by user id', async () => {
      await TestsHelper.createNewRentRequest(accessToken)
      const response = await request(app).get('/api/v1/rental/user')
      .set('authorization', `Bearer ${accessToken}`)
      .expect(200)

      expect(response.body.data).toHaveLength(1)
      expect(response.body.data[0].id).toEqual(1)
      expect(response.body.data[0].bookId).toEqual(1)
      expect(response.body.data[0].userId).toEqual(1)
      expect(response.body.data[0].returnDate).toBeNull()
      expect(response.body.data[0].book.id).toEqual(1)
      expect(response.body.data[0].book.title).toEqual('any_title')
      expect(response.body.data[0].book.subject).toEqual('any_subject')
    })

    test('Should return an empty array if there are no rentals for the given userId', async () => {
      const response = await request(app).get('/api/v1/rental/user')
      .set('authorization', `Bearer ${accessToken}`)
      .expect(200)

      expect(response.body.data).toEqual([])
    })
  })

  describe('getBookById()', () => {

    test('Should return the correct rental array by book id', async () => {
      await TestsHelper.createNewRentRequest(accessToken)
      const response = await request(app).get('/api/v1/rental/book/1')
      .set('authorization', `Bearer ${accessToken}`)
      .expect(200)

      expect(response.body.data).toHaveLength(1)
      expect(response.body.data[0].id).toEqual(1)
      expect(response.body.data[0].bookId).toEqual(1)
      expect(response.body.data[0].userId).toEqual(1)
      expect(response.body.data[0].returnDate).toBeNull()
      expect(response.body.data[0].book.id).toEqual(1)
      expect(response.body.data[0].book.title).toEqual('any_title')
      expect(response.body.data[0].book.subject).toEqual('any_subject')
    })

    test('Should return an empty array if there are no rentals for the given userId', async () => {
      const response = await request(app).get('/api/v1/rental/book/1')
      .set('authorization', `Bearer ${accessToken}`)
      .expect(200)

      expect(response.body.data).toEqual([])
    })
  })
})

