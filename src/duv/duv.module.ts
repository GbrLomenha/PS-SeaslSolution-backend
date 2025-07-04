import { Module } from '@nestjs/common';
import { DuvService } from './duv.service';
import { DuvController } from './duv.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DuvController],
  providers: [DuvService, PrismaService],
})
export class DuvModule {}
