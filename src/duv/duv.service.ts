import { Injectable } from '@nestjs/common';
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
    })
  }

  findAll() {
    return `This action returns all duv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} duv`;
  }

  update(id: number, updateDuvDto: UpdateDuvDto) {
    return `This action updates a #${id} duv`;
  }

  remove(id: number) {
    return `This action removes a #${id} duv`;
  }
}
