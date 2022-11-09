import { Router } from 'express'
import BookController from '../controllers/book-controller'
import { Auth, RequestValidator } from '../middlewares'
import { asyncWrapper } from '../utils/async-wrapper'
import { CreateBookValidation } from '../validations/books/create-book-validation'

const bookController = new BookController()

export default (router: Router): void => {
  router.post(
    '/book',
    Auth.handle(['admin']),
    RequestValidator.validate(CreateBookValidation),
    asyncWrapper(bookController.create)
  )
  router.delete(
    '/book/:id',
    Auth.handle(['admin']),
    asyncWrapper(bookController.delete)
  ),
  router.get(
    '/book',
    Auth.handle(['admin', 'user']),
    asyncWrapper(bookController.getAll)
  )
}