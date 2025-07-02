import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTripulanteDto } from './dto/create-tripulate.dto';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post("/registrar-tripulante")
  @UseInterceptors(FileInterceptor('img_file'))
  createTripulante(@Body() CreateTripulanteDto: CreateTripulanteDto, @UploadedFile() img_file: Express.Multer.File) {
    return this.pessoaService.createTripulante(CreateTripulanteDto, img_file);
  }

  @Post("/registrar-passageiro")
  @UseInterceptors(FileInterceptor('img_file'))
  createPassageiro(@Body() createPessoaDto: CreatePessoaDto, @UploadedFile() img_file: Express.Multer.File) {
    return this.pessoaService.createPassageiro(createPessoaDto, img_file);
  }


  @Get()
  findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoaService.remove(+id);
  }
}
