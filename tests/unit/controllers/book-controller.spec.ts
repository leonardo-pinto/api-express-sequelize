import { Request } from 'express'
import BookController from '../../../src/controllers/book-controller'
import Book from '../../../src/models/book'
import { BadRequestError } from '../../../src/utils/api-error'
import { SuccessResponse } from '../../../src/utils/success-response'
import { mockBook, mockCreateBookRequest, mockDeleteBookRequest } from '../mocks'

describe('Book Controller Unit tests', () => {
  describe('create()', () => {
    let bookControllerStub: BookController
    let payload: Request

    beforeEach(() => {
      bookControllerStub = new BookController()
      payload = mockCreateBookRequest()
      jest.spyOn(Book, 'findOne').mockResolvedValue(null)
      jest.spyOn(Book, 'create').mockImplementation()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should return 400 is book title is already registered', async () => {
      jest.spyOn(Book, 'findOne').mockResolvedValueOnce(mockBook())
      const result = await bookControllerStub.create(payload)
      expect(result).toEqual(new BadRequestError('Book is already registered'))
    })

    test('Should call create with correct parameters and return 201', async () => {
      const bookCreateSpy = jest.spyOn(Book, 'create')
      const result = await bookControllerStub.create(payload)
      expect(bookCreateSpy).toHaveBeenCalledWith({
          title: 'any_title',
          subject: 'any_subject',
          author: 'any_author',
          publisher: 'any_publisher',
          description: 'any_description',
          numberOfPages: 250
      })
      expect(result).toEqual(new SuccessResponse(201))
    })
  })

  describe('delete()', () => {
    let bookControllerStub: BookController
    let payload: Request

    beforeEach(() => {
      bookControllerStub = new BookController()
      payload = mockDeleteBookRequest()
      jest.spyOn(Book, 'destroy').mockResolvedValue(1)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should return 400 if book was not found ', async () => {
      jest.spyOn(Book, 'destroy').mockResolvedValueOnce(0)
      const result = await bookControllerStub.delete(payload)
      expect(result).toEqual(new BadRequestError('The book request to be deleted was not found'))
    })

    test('Should return 200 if book is deleted', async () => {
      const result = await bookControllerStub.delete(payload)
      expect(result).toEqual(new SuccessResponse(200))
    })
  })

  describe('getAll()', () => {
    let bookControllerStub: BookController


    beforeEach(() => {
      bookControllerStub = new BookController()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should return 200 and an array of books', async () => {
      jest.spyOn(Book, 'findAll').mockResolvedValue([mockBook()])
      const result = await bookControllerStub.getAll()
      expect(result.data).toHaveLength(1)
      expect(result).toEqual(new SuccessResponse(200, [mockBook()]))
    })
  })
})