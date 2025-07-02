import { Injectable } from '@nestjs/common';
import { CreateDuvDto } from './dto/create-duv.dto';
import { UpdateDuvDto } from './dto/update-duv.dto';

@Injectable()
export class DuvService {
  create(createDuvDto: CreateDuvDto) {
    return 'This action adds a new duv';
  }

  findAll() {
    return `This action returns all duv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} duv`;
  }

  update(id: number, updateDuvDto: UpdateDuvDto) {
    return `This action updates a #${id} duv`;
  }

  remove(id: number) {
    return `This action removes a #${id} duv`;
  }
}
