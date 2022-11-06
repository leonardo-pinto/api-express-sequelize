import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class LoginValidation {

  @IsNotEmpty()
  @IsEmail()
  email!: string

}