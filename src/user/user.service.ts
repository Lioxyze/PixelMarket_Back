import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        pseudo: true,
        email: true,
      },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException("User doesn't exist");
    }

    return this.prisma.user.update({
      where: { id: id },
      data: { ...dto },
      select: {
        pseudo: true,
        email: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(id: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException("User doesn't exist");
    }

    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return { message: 'User deleted successfully' };
  }
}
