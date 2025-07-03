import { PartialType } from '@nestjs/mapped-types';
import { CreateNavioDto } from './create-navio.dto';

export class UpdateNavioDto extends PartialType(CreateNavioDto) {}
