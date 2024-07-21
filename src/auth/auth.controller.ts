import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Get('/activate')
  async activateAccount(@Query('token') token: string, @Res() res: Response) {
    try {
      await this.authService.activateAccount(token);
      return res.redirect('/Auth/Login');
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
    }
  }
}
