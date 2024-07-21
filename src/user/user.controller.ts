import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateUser(
    @Body() dto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUser(id, dto);
  }

  // @UseGuards(JwtGuard)
  @HttpCode(204)
  @Delete('/delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.deleteUser(id);
    return result;
  }
}
