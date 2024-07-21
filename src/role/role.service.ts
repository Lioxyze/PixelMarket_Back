import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDto } from './dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getAllRole() {
    const role = await this.prisma.role.findMany();
    return {
      totalResults: role.length,
      categories: role,
    };
  }

  async insertNewRole(dto: RoleDto) {
    return this.prisma.role.create({
      data: {
        name: dto.name,
      },
    });
  }

  async editRole(id: number, dto: RoleDto) {
    if (!id || !dto.name) {
      throw new BadRequestException('Missing fields');
    }
    const existingRoleName = await this.prisma.role.findUnique({
      where: {
        id: dto.id,
        name: dto.name,
      },
    });

    if (existingRoleName) {
      throw new ForbiddenException('Name already taken');
    } else {
      return this.prisma.role.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
        },
      });
    }
  }

  async deleteRole(id: number) {
    if (!id) {
      throw new BadRequestException('id is missing');
    } else {
      const existingRole = await this.prisma.category.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
        },
      });
      if (!existingRole || !existingRole.id) {
        throw new ForbiddenException("Category doesn't exist");
      }

      return this.prisma.role.delete({
        where: {
          id: id,
        },
      });
    }
  }
}
