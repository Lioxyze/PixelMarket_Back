import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsEmail,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
