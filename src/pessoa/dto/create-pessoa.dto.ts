import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePessoaDto {
    @ApiProperty({
        description: 'Nome completo da pessoa',
        example: 'João da Silva',
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    NO_pessoa: string;

    @ApiProperty({
        description: 'Nacionalidade da pessoa',
        example: 'Brasileira',
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    DS_nacionalidade: string;
}
