import { Request } from 'express'

export const mockCreateRentalRequest = () => ({
  ...{
    body: {
      bookId: '1'
    },
    userId: '1'
  }
}) as unknown as Request