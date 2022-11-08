import { IsNotEmpty, IsEmail } from 'class-validator'

export class LoginValidation {

  @IsNotEmpty()
  @IsEmail()
  email!: string

}