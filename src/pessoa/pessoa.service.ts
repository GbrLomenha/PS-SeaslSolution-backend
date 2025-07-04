import { HttpException, Injectable } from '@nestjs/common';
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
    return this.prismaService.pessoa.findMany({}).
      catch(error => { 
        throw new HttpException(`Erro ao buscar pessoas: ${error.message}`, 500);
      });
  }

  findOne(ID_pessoa: number) {
    return this.prismaService.pessoa.findUnique({
      where: { ID_pessoa: ID_pessoa },
    }).catch(error => {
      throw new HttpException(`Erro ao buscar pessoa com ID ${ID_pessoa}: ${error.message}`, 500);
    });
  }

  async update(ID_pessoa: number, updatePessoaDto: UpdatePessoaDto, img_file: Express.Multer.File) {
    const pessoa = await this.prismaService.pessoa.findUnique({
      where: { ID_pessoa: ID_pessoa }
    })

    if (pessoa && img_file){
      await this.cloudinary.deleteImage(pessoa.ID_img_cloudinary)
        .catch(error => { throw new HttpException(`Falha ao deletar imagem no serviço de nuvem ${error}`, 500) });

      const uploadResult = await this.cloudinary.upload(img_file)
        .catch(error => { throw new HttpException(`Falha ao gravar a imagem no serviço de nuvem ${error}`, 500) });

      updatePessoaDto["URL_foto_pessoa"] = uploadResult.secure_url;
      updatePessoaDto["ID_img_cloudinary"] = uploadResult.public_id;
    }

    return this.prismaService.pessoa.update({
      where: { ID_pessoa: ID_pessoa },
      data: updatePessoaDto
    }).catch(error => {
      throw new HttpException(`Falha ao atualizar pessoa: ${error.message}`, 500);
    });
  }

  async remove(ID_pessoa: number) {
    const pessoa = await this.prismaService.pessoa.findUnique({
      where: { ID_pessoa: ID_pessoa }
    });

    if (!pessoa) {
      throw new HttpException(`Pessoa com ID ${ID_pessoa} não encontrado`, 404);
    }

    this.cloudinary.deleteImage(pessoa.ID_img_cloudinary)
      .catch(error => { throw new HttpException(`Falha ao deletar imagem no serviço de nuvem ${error}`, 500) });
    
    return this.prismaService.pessoa.delete({
      where: { ID_pessoa: ID_pessoa }
    }).catch(error => {
      throw new HttpException(`Falha ao remover pessoa: ${error.message}`, 500);
    }).then(() => {
      return { message: `Pessoa com ID ${ID_pessoa} removida com sucesso` };
    }
    );  
  }
}
