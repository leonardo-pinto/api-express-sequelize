import { IsNotEmpty, IsNumber } from "class-validator"

export class RentValidation {

  @IsNotEmpty()
  @IsNumber()
  bookId!: string

}