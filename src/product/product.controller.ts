import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtGuard } from 'src/auth/guard';
import { InsertProductDto } from './dto/insert.product.dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  getAllProduct() {
    return this.productService.getAllproduct();
  }

  @UseGuards(JwtGuard)
  @Post('/new')
  insertNewProduct(@Body() dto: InsertProductDto) {
    return this.productService.insertNewProduct(dto);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  editProduct(
    @Body() dto: InsertProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.editProduct(id, dto);
  }

  @Delete('/delete/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }

  @Get('/search/:title')
  searchProduct(@Param('title') title: string) {
    return this.productService.searchProduct(title);
  }

  @Get('/search')
  searchProductByTitleAndCategory(
    @Query('title') title: string,
    @Query('category') category: string,
  ) {
    return this.productService.searchProductByTitleAndCategory(title, category);
  }

  @Get('/searchId/:id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }
}
