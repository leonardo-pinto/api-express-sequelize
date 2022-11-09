import { Request } from 'express'
import Book from '../models/book'
import { BadRequestError } from '../utils/api-error'
import { SuccessResponse } from '../utils/success-response'

export default class BookController {

  async create(req: Request) {

    const {
      title,
      subject,
      author,
      publisher,
      description,
      numberOfPages
    } = req.body

    const book = await Book.findOne({ where: { title } })

    if (book) {
      return new BadRequestError('Book is already registered')
    }

    await Book.create({
      title,
      subject,
      author,
      publisher,
      description,
      numberOfPages
    })

    return new SuccessResponse(201)
  }

  async delete(req: Request) {
    const { id } = req.params

    const deletedBook = await Book.destroy({
      where: { id }
    })

    if (!deletedBook) {
      return new BadRequestError('The book request to be deleted was not found')
    }

    return new SuccessResponse(200)
  }

  async getAll() {
    const books = await Book.findAll()

    return new SuccessResponse(200, books)
  }
}