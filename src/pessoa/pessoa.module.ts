import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudniary.service';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService, PrismaService, CloudinaryService],
})
export class PessoaModule {}
