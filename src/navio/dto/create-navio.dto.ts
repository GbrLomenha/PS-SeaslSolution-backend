import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNavioDto {
    @ApiProperty({
        description: 'Nome do navio',
        example: 'Navio Esperança',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    NO_navio: string;

    @ApiProperty({
        description: 'Bandeira do navio',
        example: 'Brasil',
        type: String,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    DS_bandeira: string;
}
