import { Request } from 'express'

export const mockRenewRentalRequest = () => ({
  ...{
    params: {
      rentalId: '1'
    }
  }
}) as unknown as Request