import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTripulanteDto } from './dto/create-tripulate.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiParam, ApiTags} from '@nestjs/swagger';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';

@ApiTags('Pessoas')
@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post("/registrar-tripulante")
  @ApiOperation({ summary: 'Registrar um novo tripulante', description: 'Cria um novo tripulante com as informações fornecidas.' })
  @ApiBody({ type: CreateTripulanteDto, description: 'Dados necessários para registrar um novo tripulante além do arquivo com palavra chave img_file'})
  @ApiResponse({ status: 201, description: 'Tripulante registrado com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao registrar tripulante ou a registrar imagem no serviço de nuvem.' })
  @UseInterceptors(FileInterceptor('img_file'))
  createTripulante(@Body() CreateTripulanteDto: CreateTripulanteDto, @UploadedFile() img_file: Express.Multer.File) {
    return this.pessoaService.createTripulante(CreateTripulanteDto, img_file);
  }

  @Post("/registrar-passageiro")
  @ApiOperation({ summary: 'Registrar um novo passageiro', description: 'Cria um novo passageiro com as informações fornecidas.' })
  @ApiBody({ type: CreatePassageiroDto, description: 'Dados necessários para registrar um novo passageiro além do arquivo com palavra chave img_file'})
  @ApiResponse({ status: 201, description: 'Passageiro registrado com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao registrar passageiro ou a registrar imagem no serviço de nuvem.' })
  @UseInterceptors(FileInterceptor('img_file'))
  createPassageiro(@Body() createPassageiroDto: CreatePassageiroDto, @UploadedFile() img_file: Express.Multer.File) {
    return this.pessoaService.createPassageiro(createPassageiroDto, img_file);
  }

  @Get("/todos")
  @ApiOperation({ summary: 'Listar todas as pessoas', description: 'Retorna uma lista de todas as pessoas registradas.' })
  @ApiResponse({ status: 200, description: 'Lista de pessoas retornada com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar pessoas.' })
  @ApiBody({ type: CreatePessoaDto, description: 'Dados necessários para registrar uma nova pessoa' })
  findAll() {
    return this.pessoaService.findAll();
  }

  @Get('/detalhes/:id')
  @ApiOperation({ summary: 'Detalhes de uma pessoa específica', description: 'Retorna os detalhes de uma pessoa pelo ID fornecido.' })
  @ApiResponse({ status: 200, description: 'Detalhes da pessoa retornados com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar pessoa.' })
  @ApiBody({ type: CreatePessoaDto, description: 'Dados necessários para registrar uma nova pessoa' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da pessoa' })
  findOne(@Param('id') ID_pessoa: string) {
    return this.pessoaService.findOne(+ID_pessoa);
  }

  @Patch('atualizar/:id')
  @ApiOperation({ summary: 'Atualizar uma pessoa', description: 'Atualiza as informações de uma pessoa existente.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da pessoa a ser atualizada' })
  @ApiBody({ type: UpdatePessoaDto, description: 'Dados necessários para atualizar uma pessoa além do arquivo com palavra chave img_file' })
  @ApiResponse({ status: 200, description: 'Pessoa atualizada com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar pessoa.' })
  @UseInterceptors(FileInterceptor('img_file'))
  update(@Param('id') ID_pessoa: string, @Body() updatePessoaDto: UpdatePessoaDto, @UploadedFile() img_file: Express.Multer.File) {
    return this.pessoaService.update(+ID_pessoa, updatePessoaDto, img_file);
  }

  @Delete('apagar/:id')
  @ApiOperation({ summary: 'Remover uma pessoa', description: 'Remove uma pessoa pelo ID fornecido.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID da pessoa a ser removida' })
  @ApiResponse({ status: 200, description: 'Pessoa removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada.' })
  @ApiResponse({ status: 500, description: 'Erro ao remover pessoa.' })
  remove(@Param('id') ID_pessoa: string) {
    return this.pessoaService.remove(+ID_pessoa);
  }
}
