import { Request } from 'express'

export const mockReturnRentalRequest = () => ({
  ...{
    params: {
      rentalId: '1'
    }
  }
}) as unknown as Request