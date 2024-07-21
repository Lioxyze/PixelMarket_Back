import {
  Controller,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Post,
  Get,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response, Request } from 'express';
import { join } from 'path';
import { existsSync, createReadStream } from 'fs';

@Controller('image')
export class ImageController {
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    console.log('File:', file);
    console.log(file);

    return file;
  }

  @Post('/upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      // 'files' is the name of the field, 10 is the max count of files
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    console.log('Files:', files);
    return files;
  }

  @Get('/view/:filename')
  viewImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);

    if (existsSync(filePath)) {
      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  }
}
