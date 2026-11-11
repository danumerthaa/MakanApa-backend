import { IsString, IsNotEmpty, IsNumber, Min, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Nama menu minimal 3 karakter' })
  nama: string;

  @IsString()
  @IsOptional()
  deskripsi?: string;

  @IsNumber()
  @Min(0, { message: 'Harga tidak boleh minus' })
  harga: number;

  @IsString()
  @IsNotEmpty()
  kategori: string;

  @IsBoolean()
  @IsOptional()
  isTersedia?: boolean;
}