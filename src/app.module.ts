import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { NavioModule } from './navio/navio.module';

@Module({
  imports: [PrismaModule, NavioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
