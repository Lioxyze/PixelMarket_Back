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
    const isActivated = await this.authService.activateAccount(token);

    if (isActivated) {
      return res.redirect(
        HttpStatus.FOUND,
        'http://localhost:3001/Auth/activate',
      );
    } else {
      // Gérer le cas où l'activation échoue si nécessaire
      return res.status(HttpStatus.FORBIDDEN).send('Activation failed');
    }
  }
}
