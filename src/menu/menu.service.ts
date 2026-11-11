import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {

  private menus: Menu[] = [];

  create(createMenuDto: CreateMenuDto) {
    
    const isDuplicate = this.menus.find(
      (m) => m.nama.toLowerCase() === createMenuDto.nama.toLowerCase()
    );
    if (isDuplicate) {
      throw new ConflictException('Menu dengan nama ini sudah terdaftar!');
    }

    const newMenu: Menu = {
      id: Date.now().toString(), 
      nama: createMenuDto.nama,
      deskripsi: createMenuDto.deskripsi || '',
      harga: createMenuDto.harga,
      kategori: createMenuDto.kategori,
      isTersedia: createMenuDto.isTersedia ?? true,
      tanggalDibuat: new Date(),
    };

    this.menus.push(newMenu);
    return newMenu;
  }

  findAll() {
    return this.menus;
  }

  findOne(id: string) {
    const menu = this.menus.find((m) => m.id === id);
    if (!menu) {
   
      throw new NotFoundException(`Menu dengan ID ${id} tidak ditemukan!`);
    }
    return menu;
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    const menu = this.findOne(id); 
    const index = this.menus.indexOf(menu);
    
    this.menus[index] = { ...menu, ...updateMenuDto };
    return this.menus[index];
  }

  remove(id: string) {
    const menu = this.findOne(id);
    this.menus = this.menus.filter((m) => m.id !== id);
    return { message: `Menu '${menu.nama}' berhasil dihapus.` };
  }
}