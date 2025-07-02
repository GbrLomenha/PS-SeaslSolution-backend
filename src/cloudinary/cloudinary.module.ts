import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudniary.service';

@Module({
    providers: [CloudinaryService],
    exports: [CloudinaryService],
})
export class CloudinaryModule {}