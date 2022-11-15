import { Request } from 'express'

export const mockDeleteBookRequest = () => ({
  ...{
    params: {
      id: '1'
    }
  }
}) as unknown as Request