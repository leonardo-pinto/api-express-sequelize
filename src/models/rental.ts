import { Table, Model, Column, DataType, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Book from './book'
import User from './user'

@Table({
  timestamps: true,
  tableName: 'Rentals'
})
export default class Rental extends Model {

  @ForeignKey(() => Book)
  @Column(DataType.INTEGER)
  bookId!: number

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @AllowNull(false)
  @Column(DataType.DATE)
  rentalDate!: string

  @AllowNull(false)
  @Column(DataType.DATE)
  dueDate!: Date

  @Column(DataType.DATE)
  returnDate?: Date

  @BelongsTo(() => Book)
  book: Book

  @BelongsTo(() => User)
  user: User
}