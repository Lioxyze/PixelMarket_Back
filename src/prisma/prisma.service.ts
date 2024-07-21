import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  //  On crée instance de ConfigService en paramètre ce qui
  //  permet d'accéder aux configurations de l'application.
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
          // Configure la source de données en utilisant l'URL de la base de données
          // obtenue à partir des variables de configuration
        },
      },
    });
  }
}
