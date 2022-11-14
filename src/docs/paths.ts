import {
  registerPath,
  loginPath,
  bookPath,
  rentalPath,
  rentalByUserPath,
  rentalByBookPath,
  rentalRenewPath,
  rentalReturnPath,
  rentalByIdPath
} from './paths/'

export default {
  '/register': registerPath,
  '/login': loginPath,
  '/book': bookPath,
  '/rental': rentalPath,
  '/rental/{rentalId}': rentalByIdPath,
  '/rental/user': rentalByUserPath,
  '/rental/book': rentalByBookPath,
  '/rental/{rentalId}/renew': rentalRenewPath,
  '/rental/{rentalId}/return': rentalReturnPath
}