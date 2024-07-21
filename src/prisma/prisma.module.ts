import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// On met le décorateur @Global() pour rendre la classe exportable partout
@Global()
@Module({
  // On injecte PrismaService dans les providers
  // Et on exporte la classe PrismaService
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
