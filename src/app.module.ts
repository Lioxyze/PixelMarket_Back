import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { ImageModule } from './image/image.module';
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    EmailModule,
    CategoryModule,
    UserModule,
    RoleModule,
    CartModule,
    ProductModule,
    ImageModule,
  ],
})
export class AppModule {}
