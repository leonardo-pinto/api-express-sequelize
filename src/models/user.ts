import { Table, Model, Column, DataType, AllowNull, Unique } from 'sequelize-typescript'

@Table({
  timestamps: true,
  tableName: 'Users'
})
export default class User extends Model {

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  email!: string

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  username!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  role!: string
}