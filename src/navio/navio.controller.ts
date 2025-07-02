import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NavioService } from './navio.service';
import { CreateNavioDto } from './dto/create-navio.dto';
import { UpdateNavioDto } from './dto/update-navio.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('navio')
export class NavioController {
  constructor(private readonly navioService: NavioService) {}

  @Post("registrar")
  @UseInterceptors(FileInterceptor('img_file'))
  create(@Body() createNavioDto: CreateNavioDto, @UploadedFile() img_file: Express.Multer.File) {
    return this.navioService.create(createNavioDto, img_file);
  }

  @Get()
  findAll() {
    return this.navioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNavioDto: UpdateNavioDto) {
    return this.navioService.update(+id, updateNavioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navioService.remove(+id);
  }
}
