import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookValidation {

  @IsNotEmpty()
  @IsString()
  title!: string

  @IsNotEmpty()
  @IsString()
  subject!: string

  @IsNotEmpty()
  @IsString()
  author!: string

  @IsOptional()
  @IsString()
  publisher: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  numberOfPages: number
}