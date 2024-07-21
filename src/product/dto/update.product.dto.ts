import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  categoryId: number;
}
