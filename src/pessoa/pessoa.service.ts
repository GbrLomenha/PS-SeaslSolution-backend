import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudniary.service';
import { CreateTripulanteDto } from './dto/create-tripulate.dto';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';

@Injectable()
export class PessoaService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinary: CloudinaryService
  ) {}

  async createTripulante(createTripulanteDto: CreateTripulanteDto, img_file: Express.Multer.File) {

    const uploadResult = await this.cloudinary.upload(img_file)
      .catch(error => {
        throw new Error(`Falha ao gravar a imagem no serviço de nuvem: ${error.message}`);
      });
    const urlFoto = uploadResult.secure_url;
    const idImgCloudinary = uploadResult.public_id;

    const { DS_sid, ...pessoaData } = createTripulanteDto;
    return this.prismaService.tripulante.create({
      data: {
        pessoa: {
          create: {
            ...pessoaData,
            URL_foto_pessoa: urlFoto,
            ID_img_cloudinary: idImgCloudinary
          }
        },
        DS_sid
      },
      include: {
        pessoa: true,
      }
    });
  }

  async createPassageiro(createPassageiroDto: CreatePassageiroDto, img_file: Express.Multer.File) {
    const uploadResult = await this.cloudinary.upload(img_file)
      .catch(error => {
        throw new Error(`Falha ao gravar a imagem no serviço de nuvem: ${error.message}`);
      });
    const urlFoto = uploadResult.secure_url;
    const idImgCloudinary = uploadResult.public_id;

    return this.prismaService.passageiro.create({
      data: {
        pessoa:{
          create: {
            ...createPassageiroDto,
            URL_foto_pessoa: urlFoto,
            ID_img_cloudinary: idImgCloudinary
          }
        }
      },
      include: {
        pessoa: true,
      }
    });
  }

  findAll() {
    return `This action returns all pessoa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
