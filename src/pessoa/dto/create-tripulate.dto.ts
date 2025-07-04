import { ApiProperty } from "@nestjs/swagger";
import { CreatePessoaDto } from "./create-pessoa.dto";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateTripulanteDto extends CreatePessoaDto {
    @ApiProperty({
        description: "(Seafarers Identity Document)",
        example: 123,
        type: Number,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    DS_sid: string;
}