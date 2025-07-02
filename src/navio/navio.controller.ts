import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { NavioService } from './navio.service';
import { CreateNavioDto } from './dto/create-navio.dto';
import { UpdateNavioDto } from './dto/update-navio.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('navio')
export class NavioController {
  constructor(private readonly navioService: NavioService) {}

  @UseInterceptors(FileInterceptor('img_file'))
  @Post()
  create(@Body() createNavioDto: CreateNavioDto, img_file: Express.Multer.File) {
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
