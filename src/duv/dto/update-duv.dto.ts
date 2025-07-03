import { PartialType } from '@nestjs/mapped-types';
import { CreateDuvDto } from './create-duv.dto';

export class UpdateDuvDto extends PartialType(CreateDuvDto) {}
