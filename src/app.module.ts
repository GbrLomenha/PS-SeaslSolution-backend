import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { NavioModule } from './navio/navio.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, NavioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
