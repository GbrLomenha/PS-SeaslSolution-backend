import { IsNotEmpty, IsString } from "class-validator";

export class CreatePessoaDto {
    @IsNotEmpty()
    @IsString()
    NO_pessoa: string;

    @IsNotEmpty()
    @IsString()
    DS_nacionalidade: string;
}
