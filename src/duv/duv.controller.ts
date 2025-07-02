import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DuvService } from './duv.service';
import { CreateDuvDto } from './dto/create-duv.dto';
import { UpdateDuvDto } from './dto/update-duv.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('duv')
export class DuvController {
  constructor(private readonly duvService: DuvService) {}

  @Post('/registrar')
  @ApiOperation({ summary: 'Registrar um novo DUV', description: 'Cria um novo DUV com as informações fornecidas.' })
  @ApiBody({ type: CreateDuvDto, description: 'Dados necessários para registrar um novo DUV' })
  @ApiResponse({ status: 201, description: 'DUV registrado com sucesso.' })
  create(@Body() createDuvDto: CreateDuvDto) {
    return this.duvService.create(createDuvDto);
  }

  @Get("/todos")
  @ApiOperation({ summary: 'Listar todos os DUVs', description: 'Retorna uma lista de todos os DUVs registrados.' })
  @ApiResponse({ status: 200, description: 'Lista de DUVs retornada com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar DUVs.' })
  findAll() {
    return this.duvService.findAll();
  }

  @Get('detalhes/:id')
  @ApiOperation({ summary: 'Detalhes de um DUV específico', description: 'Retorna os detalhes de um DUV pelo ID fornecido com informações do navio e das pessoas.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do DUV' })
  @ApiResponse({ status: 200, description: 'Detalhes do DUV retornados com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar DUV.' })
  findOne(@Param('id') ID_duv: string) {
    return this.duvService.findOne(+ID_duv);
  }

  @Patch('atualizar/:id')
  @ApiOperation({ summary: 'Atualizar um DUV', description: 'Atualiza as informações de um DUV existente.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do DUV a ser atualizado' })
  @ApiBody({ type: UpdateDuvDto, description: 'Dados necessários para atualizar um DUV' })
  @ApiResponse({ status: 200, description: 'DUV atualizado com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar DUV.' })
  update(@Param('id') ID_duv: string, @Body() updateDuvDto: UpdateDuvDto) {
    return this.duvService.update(+ID_duv, updateDuvDto);
  }

  @Delete('apagar/:id')
  @ApiOperation({ summary: 'Remover um DUV', description: 'Remove um DUV pelo ID fornecido.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do DUV a ser removido' })
  @ApiResponse({ status: 200, description: 'DUV removido com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao remover DUV.' })
  remove(@Param('id') ID_duv: string) {
    return this.duvService.remove(+ID_duv);
  }
}
