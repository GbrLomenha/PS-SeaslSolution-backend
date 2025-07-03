import { CreatePessoaDto } from "./create-pessoa.dto";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateTripulanteDto extends CreatePessoaDto {
    @IsNotEmpty()
    @IsString()
    DS_sid: string;
}