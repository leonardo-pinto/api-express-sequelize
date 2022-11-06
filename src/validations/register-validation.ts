import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class RegisterValidation {

  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsString()
  firstName!: string

  @IsNotEmpty()
  @IsString()
  lastName!: string

  @IsNotEmpty()
  @IsString()
  role!: string
}