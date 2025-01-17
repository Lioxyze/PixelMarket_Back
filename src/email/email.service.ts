import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: this.config.get('MAILER_SECURE') === 'false',
      auth: {
        user: this.config.get('SMTP_EMAIL'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/Auth/activate?token=${token}`;

    const emailHtml = `
<p>Hey ${user.pseudo},</p>
<p>You requested an account creation on Pixel Market, the figurine sales site.</p>
<p>To activate your account, please click on the link below:</p>
<p><a href='${url}'>Click here to activate your account</a></p>
<p>If you did not request this email, you can safely ignore it.</p>
<p>Thank you,<br>The Pixel Market Team</p>
<p>`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: 'Welcome user! Confirm your Email',
      html: emailHtml,
    });
  }
}
