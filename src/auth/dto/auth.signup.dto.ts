import {
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  MaxLength,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupDto {
  id: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(255)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  pseudo: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  phone: string;
}
