import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta o serviço para ser injetado
})
export class PrismaModule {}