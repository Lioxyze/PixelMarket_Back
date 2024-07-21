import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
