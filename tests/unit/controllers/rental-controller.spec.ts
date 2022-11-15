import { Request } from 'express'
import { DateTime, Settings } from 'luxon'
import RentalController from '../../../src/controllers/rental-controller'
import Rental from '../../../src/models/rental'
import { BadRequestError } from '../../../src/utils/api-error'
import { SuccessResponse } from '../../../src/utils/success-response'
import {
  mockCreateRentalRequest,
  mockRenewRentalRequest,
  mockRental
} from '../mocks'

Settings.now = () => new Date(2022, 1, 1).valueOf()
DateTime.local().toISO()

describe('Rental Controller Unit tests', () => {
  describe('rent()', () => {

    let rentalControllerStub: RentalController
    let payload: Request


    beforeEach(() => {
      rentalControllerStub = new RentalController()
      payload = mockCreateRentalRequest()
      jest.spyOn(Rental, 'create').mockImplementation()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should call rental create with correct parameters', async () => {
      const rentalCreateSpy = jest.spyOn(Rental, 'create')
      await rentalControllerStub.rent(payload)
      expect(rentalCreateSpy).toHaveBeenCalledTimes(1)
      expect(rentalCreateSpy).toHaveBeenCalledWith({
        bookId: '1',
        userId: '1',
        dueDate: DateTime.now().plus({ days: 7 }),
        rentalDate: DateTime.now()
      })
    })

    test('Should return 201', async () => {
      const result = await rentalControllerStub.rent(payload)
      expect(result).toEqual(new SuccessResponse(201))
    })
  })

  describe('renew()', () => {
    let rentalControllerStub: RentalController
    let payload: Request


    beforeEach(() => {
      rentalControllerStub = new RentalController()
      payload = mockRenewRentalRequest()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should return 400 if rental was not found', async () => {
      jest.spyOn(Rental, 'findOne').mockResolvedValue(null)
      const result = await rentalControllerStub.renew(payload)
      expect(result).toEqual(
        new BadRequestError('Rental register was not found')
      )
    })

    test('Should return 400 if rental is overdue', async () => {
      const overdueRental = mockRental()
      overdueRental.dueDate = new Date(2022, 1, 1)
      jest.spyOn(Rental, 'findOne').mockResolvedValue(overdueRental)

      const result = await rentalControllerStub.renew(payload)
      expect(result).toEqual(
        new BadRequestError('The given rental is overdue. It is not possible to renew it')
      )
    })

    test('Should update rental and return 200', async () => {
      jest.spyOn(Rental, 'findOne').mockResolvedValue(mockRental())
      const rentalUpdateSpy = jest.spyOn(Rental, 'update').mockImplementation()
      const result = await rentalControllerStub.renew(payload)
      expect(rentalUpdateSpy).toHaveBeenCalledTimes(1)
      expect(result).toEqual(new SuccessResponse(200))
    })
  })

  describe('return()', () => {
    let rentalControllerStub: RentalController
    let payload: Request


    beforeEach(() => {
      rentalControllerStub = new RentalController()
      payload = mockRenewRentalRequest()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should return 400 if return was not found', async () => {
      jest.spyOn(Rental, 'update').mockResolvedValue([0])
      const result = await rentalControllerStub.return(payload)
      expect(result).toEqual(new BadRequestError('Rental register was not found'))
    })

    test('Should update rental and return 200', async () => {
      jest.spyOn(Rental, 'update').mockResolvedValue([1])
      const result = await rentalControllerStub.return(payload)
      expect(result).toEqual(new SuccessResponse(200))
    })
  })

  describe('getById()', () => {

    test('Should return a rental', async () => {
      const rentalControllerStub = new RentalController()
      const payload = {
        params: {
          rentalId: '1'
        }
      } as unknown as Request
      jest.spyOn(Rental, 'findOne').mockResolvedValue(mockRental())
      const result = await rentalControllerStub.getById(payload)
      expect(result).toEqual(new SuccessResponse(200, mockRental()))
    })
  })

  describe('getByUserId()', () => {

    test('Should return a rental array', async () => {
      const rentalControllerStub = new RentalController()
      const payload = {
        userId: '1'
      } as unknown as Request
      jest.spyOn(Rental, 'findAll').mockResolvedValue([mockRental()])
      const result = await rentalControllerStub.getByUserId(payload)
      expect(result).toEqual(new SuccessResponse(200, [mockRental()]))
    })
  })

  describe('getByBook()', () => {

    test('Should return a rental array', async () => {
      const rentalControllerStub = new RentalController()
      const payload = {
        params: {
          bookId: '1'
        }
      } as unknown as Request
      jest.spyOn(Rental, 'findAll').mockResolvedValue([mockRental()])
      const result = await rentalControllerStub.getByBookId(payload)
      expect(result).toEqual(new SuccessResponse(200, [mockRental()]))
    })
  })
})