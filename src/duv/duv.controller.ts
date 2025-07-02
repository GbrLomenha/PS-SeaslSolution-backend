import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DuvService } from './duv.service';
import { CreateDuvDto } from './dto/create-duv.dto';
import { UpdateDuvDto } from './dto/update-duv.dto';

@Controller('duv')
export class DuvController {
  constructor(private readonly duvService: DuvService) {}

  @Post('/registrar')
  create(@Body() createDuvDto: CreateDuvDto) {
    return this.duvService.create(createDuvDto);
  }

  @Get("/todos")
  findAll() {
    return this.duvService.findAll();
  }

  @Get('detalhes/:id')
  findOne(@Param('id') ID_duv: string) {
    return this.duvService.findOne(+ID_duv);
  }

  @Patch('atualizar/:id')
  update(@Param('id') ID_duv: string, @Body() updateDuvDto: UpdateDuvDto) {
    return this.duvService.update(+ID_duv, updateDuvDto);
  }

  @Delete('apagar/:id')
  remove(@Param('id') ID_duv: string) {
    return this.duvService.remove(+ID_duv);
  }
}
