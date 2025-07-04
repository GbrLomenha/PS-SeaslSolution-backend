import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import toStream = require('buffer-to-stream');


@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })
    this.cloudinaryUrl = `cloudinary://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@${process.env.CLOUDINARY_CLOUD_NAME}`
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