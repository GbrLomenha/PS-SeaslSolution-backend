import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import toStream = require('buffer-to-stream');


@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({ //Dados expostos apenas por desafio tecnico, não devem ser utilizados em produção
      cloud_name: "df7bz8she",
      api_key: "476877472667937",
      api_secret: "DFfj_H5Dv-d15nNlGTk-HNuR30s",
      secure: true,
    })
    this.cloudinaryUrl = "cloudinary://476877472667937:DFfj_H5Dv-d15nNlGTk-HNuR30s@df7bz8she"
  }

  public cloudinaryUrl: string

  async upload(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      if (!file || !file.buffer) {
        return reject(new HttpException('Arquivo não foi enviado ou não está disponível.', HttpStatus.BAD_REQUEST));
      }
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          console.error('Erro ao fazer upload no Cloudinary:', error);
          return reject(new HttpException('Erro ao fazer upload da imagem. Detalhes: ' + error.message, HttpStatus.BAD_REQUEST));
        }
        resolve(result as UploadApiResponse);
      });

      toStream(file.buffer).pipe(upload);
    });
  } 

/**
 * Exclui uma imagem do Cloudinary com base no seu publicId.
 *
 * @param publicId - O identificador público da imagem a ser excluída no Cloudinary.
 * @returns Uma Promise que é resolvida quando a imagem é excluída com sucesso.
 * @throws HttpException - Lança uma exceção HTTP caso ocorra um erro ao deletar a imagem.
 */
  async deleteImage(publicId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await v2.uploader.destroy(publicId, (error) => {
        if (error) {
          console.error('Erro ao deletar imagem no Cloudinary:', error);
          return reject(new HttpException('Erro ao deletar imagem. Tente novamente.', HttpStatus.BAD_REQUEST));
        }
        resolve();
      });
    });
  }
}