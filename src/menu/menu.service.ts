import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMenuDto } from './dto/create-menu.dto.js';
import { UpdateMenuDto } from './dto/update-menu.dto.js';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    try {
      return await this.prisma.menu.create({
        data: createMenuDto,
      });
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new ConflictException(
          `Menu dengan nama "${createMenuDto.nama}" sudah ada`,
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.menu.findMany({
      orderBy: { tanggalDibuat: 'desc' },
    });
  }

  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });
    if (!menu) {
      throw new NotFoundException(`Menu dengan ID ${id} tidak ditemukan`);
    }
    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    await this.findOne(id);
    try {
      return await this.prisma.menu.update({
        where: { id },
        data: updateMenuDto,
      });
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new ConflictException(
          `Menu dengan nama "${updateMenuDto.nama}" sudah ada`,
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}