import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  uploadImage(route: string, file: Express.Multer.File) {
    console.log(route, file);
  }
}
