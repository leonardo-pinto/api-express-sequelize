import { Request } from 'express'
import Rental from '../models/rental'
import { SuccessResponse } from "../utils/success-response"
import Book from '../models/book'
import { DateTime } from 'luxon'
import { BadRequestError } from '../utils/api-error'

export default class RentalController {

  async rent(req: Request) {
    const { bookId } = req.body
    const { userId } = req
    const rentalDate = DateTime.now()
    const dueDate = DateTime.now().plus({ days: 7 })

    await Rental.create({
      bookId,
      userId,
      rentalDate,
      dueDate
    })

    return new SuccessResponse(201)
  }

  async renew(req: Request) {
    const { rentalId } = req.params

    const rental = await Rental.findOne({
      where: { id: rentalId }
    })

    if (!rental) {
      return new BadRequestError('Rental register was not found')
    }

    if (DateTime.fromJSDate(rental.dueDate) > DateTime.now()) {
      await Rental.update(
        { dueDate: DateTime.fromJSDate(rental.dueDate).plus({ days: 7 }) },
        { where: { id: rentalId } }
      )
    } else {
      return new BadRequestError('The given rental is overdue. It is not possible to renew it')
    }

    return new SuccessResponse(200)
  }

  async return(req: Request){
    const { rentalId } = req.params

    const updatedRental = await Rental.update(
      { returnDate: DateTime.now() },
      { where: { id: rentalId } }
    )

    if (!updatedRental[0]) {
      return new BadRequestError('Rental register was not found')
    }

    return new SuccessResponse(200)
  }

  async getById(req: Request) {
    const { rentalId } = req.params
    const rental = await Rental.findOne({
      where: { id: rentalId },
      include: Book
    })

    return new SuccessResponse(200, rental)
  }

  async getByUserId(req: Request) {
    const { userId } = req

    const rentals = await Rental.findAll({
      where: { userId },
      include: Book
    })

    return new SuccessResponse(200, rentals)
  }

  async getByBookId(req: Request) {
    const { bookId } = req.params

    const rentals = await Rental.findAll({
      where: { bookId },
      include: Book
    })

    return new SuccessResponse(200, rentals)
  }
}