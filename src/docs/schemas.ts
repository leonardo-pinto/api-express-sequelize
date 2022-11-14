import {
  registerParamsSchema,
  loginParamsSchema,
  createBookParamsSchema,
  rentParamsSchema,
  accessTokenSchema,
  bookResultSchema,
  bookSchema,
  rentalSchema,
  rentalsSchema,
  successResponseSchema
} from './schemas/'

export default {
  register: registerParamsSchema,
  login: loginParamsSchema,
  createBookParams: createBookParamsSchema,
  book: bookSchema,
  booksResult: bookResultSchema,
  rentBook: rentParamsSchema,
  accessToken: accessTokenSchema,
  rental: rentalSchema,
  rentals: rentalsSchema,
  success: successResponseSchema,

}