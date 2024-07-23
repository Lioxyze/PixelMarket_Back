import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @UseGuards(JwtGuard)
  @Post('/new')
  insertNewCategory(@Body() dto: CategoryDto) {
    return this.categoryService.insertNewCategory(dto);
  }
  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  async editCategory(@Body() dto: CategoryDto, @Param('id') id: string) {
    return this.categoryService.editCategory(parseInt(id), dto);
  }

  @Delete('/delete/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Get('/search/:name')
  searchProduct(@Param('title') name: string) {
    return this.categoryService.searchCategoryById(name);
  }
}
