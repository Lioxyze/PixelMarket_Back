import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async signup(
    dto: SignupDto,
  ): Promise<{ access_token: string; roleId: number; pseudo: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new ForbiddenException('Email already taken');
    }

    const hash = await argon.hash(dto.password);

    const token = randomBytes(32).toString('hex');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        firstname: dto.firstname,
        lastname: dto.lastname,
        pseudo: dto.pseudo,
        address: dto.address,
        phone: dto.phone,
        roleId: 1,
        isActive: false,
        token: token,
      },
    });

    await this.emailService.sendUserConfirmation(user, token);

    const { access_token } = await this.signToken(user.id);
    return {
      access_token,
      roleId: user.roleId,
      pseudo: user.pseudo,
    };
  }

  async signin(
    dto: SigninDto,
  ): Promise<{ access_token: string; roleId: number; pseudo: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Account not activated');
    }

    const isValidPassword = await argon.verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new ForbiddenException('Invalid credentials');
    }

    const { access_token } = await this.signToken(user.id);

    return {
      access_token,
      roleId: user.roleId,
      pseudo: user.pseudo,
    };
  }

  async signToken(userId: number): Promise<{ access_token: string }> {
    const payload = { sub: userId };
    const secret = this.configService.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });

    return { access_token: token };
  }

  async activateAccount(token: string): Promise<boolean> {
    console.log('je suis la', token);
    const user = await this.prisma.user.findUnique({
      where: {
        token: token,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid token');
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActive: true,
        token: '',
      },
    });

    return true; // Indication de succès
  }
}
