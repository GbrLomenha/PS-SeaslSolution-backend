import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { NavioModule } from './navio/navio.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { DuvModule } from './duv/duv.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, NavioModule, PessoaModule, DuvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
