import { Request } from 'express'

export const mockCreateBookRequest = () => ({
  ...{
    body: {
      title: 'any_title',
      subject: 'any_subject',
      author: 'any_author',
      publisher: 'any_publisher',
      description: 'any_description',
      numberOfPages: 250
    }
  }
}) as Request