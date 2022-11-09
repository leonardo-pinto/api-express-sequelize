import { Table, Model, Column, DataType, AllowNull, Unique } from 'sequelize-typescript'

@Table({
  timestamps: true,
  tableName: 'Books'
})
export default class Book extends Model {

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  title!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  subject!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  author!: string

  @Column(DataType.STRING)
  publisher: string

  @Column(DataType.STRING)
  description: string

  @Column(DataType.INTEGER)
  numberOfPages: number

}