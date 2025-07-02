import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { v2 as cloudinary, UploadApiResponse, v2 } from 'cloudinary'

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: "df7bz8she",
      api_key: "476877472667937",
      api_secret: "DFfj_H5Dv-d15nNlGTk-HNuR30s",
      secure: true,
    })
    this.cloudinaryUrl = "cloudinary://476877472667937:DFfj_H5Dv-d15nNlGTk-HNuR30s@df7bz8she"
  }

  public cloudinaryUrl: string

/**
 * Faz o upload de uma imagem para o Cloudinary com configurações específicas de transformação.
 *
 * @param file - O arquivo de imagem a ser enviado. Pode ser um caminho de arquivo local, buffer ou stream suportado pelo Cloudinary.
 * @returns Uma Promise que resolve para um objeto `UploadApiResponse` contendo os dados do upload, incluindo a URL segura da imagem.
 *
 * @throws {HttpException} Lança uma exceção HTTP com status 400 se o upload falhar.
 *
 * @remarks
 * - A imagem é enviada para a pasta "ps-seals" no Cloudinary.
 * - Aplica transformações para limitar o tamanho, ajustar qualidade, escolher formato eficiente, comprimir e remover metadados.
 * - A propriedade `url` do resultado é sobrescrita com o valor de `secure_url` para garantir o uso de HTTPS.
 */
  async uploadImage(file): Promise<UploadApiResponse> {
    
    return new Promise<UploadApiResponse>(async (resolve, reject) => {
      try {
        const result = await v2.uploader.upload(
          file,
          {
            folder: "ps-seals", // Define/cria uma pasta no Cloudinary
            resource_type: 'image',
            transformation: [
              { width: 500, height: 500, crop: 'limit' }, // Redimensiona mantendo proporção
              { quality: 'auto' }, // Ajusta qualidade automaticamente
              { fetch_format: 'auto' }, // Usa formato mais eficiente, WebP, AVIF ou JPEG
              { flags: 'lossy' }, // Usa compressão extra para formatos como PNG
              { flags: 'strip_profile' } // Remove metadados desnecessários (EXIF, ICC, etc.)
            ]
          }
        )
        const secureResult = result as UploadApiResponse;
        secureResult.url = result.secure_url;
        resolve(secureResult);
      } catch (error) {
        reject( new HttpException(`Failed to upload image to cloudinary: ${error.message}`, HttpStatus.BAD_REQUEST))
      }
    })  


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