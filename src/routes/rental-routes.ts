import { Router } from 'express';
import RentalController from '../controllers/rental-controller';
import { Auth, RequestValidator } from '../middlewares';
import { asyncWrapper } from '../utils/async-wrapper';
import { RentValidation } from '../validations/rentals/rent-validation';

const rentalController = new RentalController()

export default (router: Router): void => {
  router.post(
    '/rental',
    Auth.handle(['admin', 'user']),
    RequestValidator.validate(RentValidation),
    asyncWrapper(rentalController.rent)
  ),
  router.put(
    '/rental/:rentalId/renew',
    Auth.handle(['admin', 'user']),
    asyncWrapper(rentalController.renew)
  ),
  router.put(
    '/rental/:rentalId/return',
    Auth.handle(['admin', 'user']),
    asyncWrapper(rentalController.return)
  )
  router.get(
    '/rental/user',
    Auth.handle(['admin', 'user']),
    asyncWrapper(rentalController.getByUserId)
    ),
  router.get(
    '/rental/:rentalId',
    Auth.handle(['admin', 'user']),
    asyncWrapper(rentalController.getById)
  ),
  router.get(
    '/rental/book/:bookId',
    Auth.handle(['admin', 'user']),
    asyncWrapper(rentalController.getByBookId)
  )
}