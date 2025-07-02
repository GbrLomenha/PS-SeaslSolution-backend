import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { NavioModule } from './navio/navio.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PessoaModule } from './pessoa/pessoa.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, NavioModule, PessoaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
