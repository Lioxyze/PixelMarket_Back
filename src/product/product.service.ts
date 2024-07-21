import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertProductDto } from './dto/insert.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
  product: any;
  constructor(private prisma: PrismaService) {}

  async getAllproduct() {
    const product = await this.prisma.product.findMany();
    return {
      totalResults: product.length,
      product: product,
    };
  }

  async insertNewProduct(dto: InsertProductDto) {
    const { categoryId } = dto;
    return this.prisma.product.create({
      data: {
        title: dto.title,
        image: dto.image,
        price: dto.price,
        status: dto.status,
        categoryId: parseInt(String(categoryId)),
      },
    });
  }

  async editProduct(id: number, dto: UpdateProductDto) {
    if (!id || !dto.title) {
      throw new BadRequestException('Missing fields');
    }
    const existingProductName = await this.prisma.product.findUnique({
      where: {
        id: dto.id,
        title: dto.title,
      },
    });

    if (existingProductName) {
      throw new ForbiddenException('Name already taken');
    } else {
      return this.prisma.product.update({
        where: {
          id: id,
        },
        data: {
          title: dto.title,
          image: dto.image,
          price: dto.price,
          status: dto.status,
          categoryId: dto.categoryId,
        },
      });
    }
  }

  async deleteProduct(id: number) {
    if (!id) {
      throw new BadRequestException('id is missing');
    } else {
      const existingProduct = await this.prisma.product.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
        },
      });
      if (!existingProduct || !existingProduct.id) {
        throw new ForbiddenException("Category doesn't exist");
      }

      return this.prisma.product.delete({
        where: {
          id: id,
        },
      });
    }
  }

  async searchProduct(productName: string) {
    return this.prisma.product.findMany({
      where: {
        title: {
          contains: productName,
        },
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  async searchProductByTitleAndCategory(title: string, category: string) {
    return this.prisma.product.findMany({
      where: {
        title: {
          contains: title,
        },
        category: {
          name: category,
        },
      },
      orderBy: {
        title: 'asc',
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product;
  }
}
