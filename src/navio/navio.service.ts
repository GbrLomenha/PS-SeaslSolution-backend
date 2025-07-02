import { Injectable } from '@nestjs/common';
import { CreateNavioDto } from './dto/create-navio.dto';
import { UpdateNavioDto } from './dto/update-navio.dto';

@Injectable()
export class NavioService {
  create(createNavioDto: CreateNavioDto) {
    return 'This action adds a new navio';
  }

  findAll() {
    return `This action returns all navio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} navio`;
  }

  update(id: number, updateNavioDto: UpdateNavioDto) {
    return `This action updates a #${id} navio`;
  }

  remove(id: number) {
    return `This action removes a #${id} navio`;
  }
}
