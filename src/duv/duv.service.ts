import { HttpException, Injectable } from '@nestjs/common';
import { CreateDuvDto } from './dto/create-duv.dto';
import { UpdateDuvDto } from './dto/update-duv.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class DuvService {

  constructor(private readonly prisma: PrismaService) {} // Assuming prisma is injected

  create(createDuvDto: CreateDuvDto) {
    return this.prisma.dUV.create({
      data: {
        NU_duv: uuidv4(),
        DT_viagem: new Date(createDuvDto.DT_viagem),
        ID_navio: createDuvDto.ID_navio,
        pessoas: {
          connect: createDuvDto.ID_pessoa.map(id => ({ ID_pessoa: id })),
        },
      },
    }).catch(error => { throw new HttpException(`Erro ao registrar DUV: ${error}`, 500); });  
      
  }

  findAll() {
    return this.prisma.dUV.findMany({})
      .catch(error => { throw new HttpException(`Erro ao buscar DUVs: ${error}`, 500) } );
  }

  findOne(ID_duv: number) {
    return this.prisma.dUV.findUnique({
      where: { ID_duv },
      include: {
        pessoas: true,
        navio: true,
      },
    }).catch(error => { throw new HttpException(`Erro ao buscar DUV: ${error}`, 500) });
  }

  async update(ID_duv: number, updateDuvDto: UpdateDuvDto) {
    const duv = await this.prisma.dUV.findUnique({
      where: { ID_duv },
      include: { pessoas: { select: { ID_pessoa: true } } }
    }).catch(error => { throw new HttpException(`Erro ao buscar DUV para atualização: ${error}`, 500) });

    if (!duv) {
      throw new HttpException(`DUV com ID ${ID_duv} não encontrado`, 404);
    }

    // IDs já relacionados
    const IdsExistentes = duv.pessoas.map(p => p.ID_pessoa);
    // IDs a adicionar (apenas os que não existem ainda)
    const IdsAdicionados = (updateDuvDto.ID_pessoa ?? []).filter(id => !IdsExistentes .includes(id));

    return this.prisma.dUV.update({
      where: { ID_duv },
      data: {
        DT_viagem: updateDuvDto.DT_viagem ? new Date(updateDuvDto.DT_viagem) : duv.DT_viagem,
        ID_navio: updateDuvDto.ID_navio,
        pessoas: {
          connect: IdsAdicionados.map(id => ({ ID_pessoa: id })),
        },
      },include: {
        pessoas: true,
        navio: true,
      },
    }).catch(error => { throw new HttpException(`Erro ao atualizar DUV: ${error}`, 500) });
  }

  remove(ID_duv: number) {
    return this.prisma.dUV.delete({
      where: { ID_duv },
    }).catch(error => { throw new HttpException(`Erro ao remover DUV: ${error}`, 500) })
    .then(() => {
      return { message: `DUV com ID ${ID_duv} removido com sucesso` };
    }); 
  }
}
