import { Table, Model, Column, DataType, AllowNull, Unique, BeforeSave, AfterSave } from 'sequelize-typescript'
import bcrypt from 'bcrypt'
import env from '../config/environment'

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

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.password) {
      const hashedPassword =  await bcrypt.hash(user.password, env.saltRounds)
      user.password = hashedPassword
    }
  }

  static async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
  }
}