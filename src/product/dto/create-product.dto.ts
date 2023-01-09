import { IsString, IsUrl, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsNumber()
  price: number;
}
