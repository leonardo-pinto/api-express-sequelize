import Rental from '../../../src/models/rental'
import { mockBook } from './book.mock'

export const mockRental = () => ({
  ...{
    id: '1',
    bookId: '1',
    userId: '1',
    rentalDate: new Date(2022, 1, 1),
    dueDate: new Date(2022, 1, 8),
    returnDate: null,
    book: mockBook()
  }
}) as unknown as Rental