import TestsHelper from '../tests-helper'
import request from 'supertest'
import Book from '../../../src/models/book'

describe('Book Controller E2E tests', () => {

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
  })

  describe('create()', () => {

    test('Should return 400 if request has missing parameters', async () => {
      const response = await request(app).post('/api/v1/book')
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        subject: 'any_subject',
        author: 'any_author',
        publisher: 'any_publisher'
      }).expect(400)

      expect(response.body.error.message).toEqual('Request validation failed')
      expect(response.body.error.errors).toEqual(expect.any(Array))
      expect(response.body.error.stack).toEqual(expect.any(String))
    })

    test('Should create a new book', async () => {
      const response = await TestsHelper.createNewBookRequest(accessToken)

      expect(response.statusCode).toEqual(201)
      const books = await Book.findAll()
      expect(books.length).toEqual(1)
      expect(books[0].id).toEqual(1)
      expect(books[0].title).toEqual('any_title')
      expect(books[0].subject).toEqual('any_subject')
      expect(books[0].author).toEqual('any_author')
      expect(books[0].publisher).toEqual('any_publisher')
    })

    test('Should return 400 if book title is already registered', async () => {
      await TestsHelper.createNewBook()
      const response = await TestsHelper.createNewBookRequest(accessToken)
      expect(response.statusCode).toEqual(400)
      expect(response.body.error.message).toEqual('Book is already registered')
      expect(response.body.error.stack).toEqual(expect.any(String))
    })

    test('Should return 500 if findOne throws', async () => {
      jest.spyOn(Book, 'findOne').mockImplementationOnce(() => {
        throw new Error
      })

      const response = await TestsHelper.createNewBookRequest(accessToken)
      expect(response.statusCode).toEqual(500)
      expect(response.body.error.message).toEqual(expect.any(String))
      expect(response.body.error.stack).toEqual(expect.any(String))
    })
  })

  describe('delete()', () => {
    test('Should return 400 if book does not exist', async () => {
      const response = await TestsHelper.deleteBookRequest('1', accessToken)
      expect(response.statusCode).toEqual(400)
      expect(response.body.error.message).toEqual('The book request to be deleted was not found')
      expect(response.body.error.stack).toEqual(expect.any(String))
    })

    test('Should delete a book successfully', async () => {
      await TestsHelper.createNewBookRequest(accessToken)

      const response = await TestsHelper.deleteBookRequest('1', accessToken)

      expect(response.statusCode).toEqual(200)
      const books = await Book.findAll()
      expect(books.length).toEqual(0)
    })
  })

  describe('getAll()', () => {
    test('Should return an array containing all books', async () => {
      await TestsHelper.createNewBookRequest(accessToken)

      const response = await TestsHelper.getAllBooksRequest(accessToken)

      expect(response.statusCode).toEqual(200)
      expect(response.body.data).toHaveLength(1)
    })
  })
})

