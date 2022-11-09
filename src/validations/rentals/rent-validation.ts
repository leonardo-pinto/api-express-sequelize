import { IsNotEmpty, IsString } from "class-validator"

export class RentValidation {

  @IsNotEmpty()
  @IsString()
  bookId!: string

}