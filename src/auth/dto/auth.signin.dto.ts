import {
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(255)
  password: string;
}
