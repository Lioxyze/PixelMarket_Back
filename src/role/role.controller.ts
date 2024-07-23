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
import { RoleService } from './role.service';
import { RoleDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtGuard)
  @Get('/all')
  getAllRole() {
    return this.roleService.getAllRole();
  }
  @UseGuards(JwtGuard)
  @Post('/new')
  insertNewRole(@Body() dto: RoleDto) {
    return this.roleService.insertNewRole(dto);
  }
  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  editRole(@Body() dto: RoleDto, @Param('id', ParseIntPipe) id: number) {
    return this.roleService.editRole(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.deleteRole(id);
  }
}
