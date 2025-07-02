import { HttpException, Injectable } from '@nestjs/common';
import { CreateNavioDto } from './dto/create-navio.dto';
import { UpdateNavioDto } from './dto/update-navio.dto';
import { CloudinaryService } from 'src/cloudinary/cloudniary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NavioService {

  constructor(
    private readonly cloudinary: CloudinaryService,
    private readonly prismaService: PrismaService
  ) {}

  async create(createNavioDto: CreateNavioDto, img_file: Express.Multer.File) {
    const uploadResult = await this.cloudinary.upload(img_file)
      .catch(error => { throw new HttpException(`Falha ao gravar a imagem no serviço de nuvem ${error}`, 500) });

    const imageUrl = uploadResult.secure_url;
    const idCloudinary = uploadResult.public_id;


    return this.prismaService.navio.create({
      data: {
        ...createNavioDto,
        URL_img_navio: imageUrl,
        ID_img_cloudinary: idCloudinary
      }
    }).catch(error => {
      throw new HttpException(`Falha ao criar navio: ${error.message}`, 500);
    });
  }

  findAll() {
    return this.prismaService.navio.findMany({})
      .catch(error => {
        throw new HttpException(`Falha ao buscar navios: ${error.message}`, 500);
      });
  }

  findOne(ID_navio: number) {
    return this.prismaService.navio.findUnique({
      where: { ID_navio }
    }).catch(error => {
      throw new HttpException(`Falha ao buscar navio: ${error.message}`, 500);
    });
  }

  update(ID_navio: number, updateNavioDto: UpdateNavioDto) {
    return this.prismaService.navio.update({
      where: { ID_navio },
      data: updateNavioDto
    }).catch(error => {
      throw new HttpException(`Falha ao atualizar navio: ${error.message}`, 500);
    });
  }

  remove(id: number) {
    return `This action removes a #${id} navio`;
  }
}
