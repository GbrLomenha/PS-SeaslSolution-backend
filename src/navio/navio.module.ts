import { Module } from '@nestjs/common';
import { NavioService } from './navio.service';
import { NavioController } from './navio.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NavioController],
  providers: [NavioService, PrismaService],
})
export class NavioModule {}
