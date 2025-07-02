import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NavioService } from './navio.service';
import { CreateNavioDto } from './dto/create-navio.dto';
import { UpdateNavioDto } from './dto/update-navio.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Navios')
@Controller('navio')
export class NavioController {
  constructor(private readonly navioService: NavioService) {}

  @Post("registrar")
  @ApiOperation({ summary: 'Registrar um novo navio', description: 'Cria um novo navio com as informações fornecidas.' })
  @ApiBody({ type: CreateNavioDto, description: 'Dados necessários para registrar um novo navio' })
  @ApiResponse({ status: 201, description: 'Navio registrado com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao registrar navio ou a registrar imagem no serviço de nuvem.' })
  @UseInterceptors(FileInterceptor('img_file'))
  create(@Body() createNavioDto: CreateNavioDto, @UploadedFile() img_file: Express.Multer.File) {
    return this.navioService.create(createNavioDto, img_file);
  }

  @Get("/todos")
  @ApiOperation({ summary: 'Listar todos os navios', description: 'Retorna uma lista de todos os navios registrados.' })
  @ApiResponse({ status: 200, description: 'Lista de navios retornada com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar navios.' })
  findAll() {
    return this.navioService.findAll();
  }

  @Get('detalhes/:id')
  @ApiOperation({ summary: 'Detalhes de um navio específico', description: 'Retorna os detalhes de um navio pelo ID fornecido.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do navio' })
  @ApiResponse({ status: 200, description: 'Detalhes do navio retornados com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar navio.' })
  findOne(@Param('id') ID_navio: string) {
    return this.navioService.findOne(+ID_navio);
  }

  @Patch('atualizar/:id')
  @ApiOperation({ summary: 'Atualizar um navio', description: 'Atualiza as informações de um navio existente.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do navio a ser atualizado' })
  @ApiBody({ type: UpdateNavioDto, description: 'Dados necessários para atualizar um navio' })
  @ApiResponse({ status: 200, description: 'Navio atualizado com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar navio ou a registrar imagem no serviço de nuvem.' })
  @UseInterceptors(FileInterceptor('img_file'))
  update(@Param('id') ID_navio: string, @Body() updateNavioDto: UpdateNavioDto, @UploadedFile() img_file?: Express.Multer.File) {
    return this.navioService.update(+ID_navio, updateNavioDto, img_file);
  }

  @Delete('apagar/:id')
  @ApiOperation({ summary: 'Remover um navio', description: 'Remove um navio pelo ID fornecido.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do navio a ser removido' })
  @ApiResponse({ status: 200, description: 'Navio removido com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao remover navio.' })
  remove(@Param('id') ID_navio: string) {
    return this.navioService.remove(+ID_navio);
  }
}
