import { Module } from '@nestjs/common';
import { NavioService } from './navio.service';
import { NavioController } from './navio.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudniary.service';

@Module({
  controllers: [NavioController],
  providers: [NavioService, PrismaService, CloudinaryService],
})
export class NavioModule {}
