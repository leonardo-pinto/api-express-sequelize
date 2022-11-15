import Book from '../../../src/models/book'

export const mockBook = () => ({
  ...{
    id: '1',
    title: 'any_title',
    subject: 'any_subject',
    author: 'any_author',
    publisher: 'any_publisher',
    description: 'any_description',
    numberOfPages: 250
  }
}) as Book