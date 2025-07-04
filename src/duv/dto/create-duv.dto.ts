import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDuvDto {
    @ApiProperty({
        description: 'ID do navio que está realizando a viagem',
        example: 123,
        type: Number,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    ID_navio: number

    @ApiProperty({
        description: 'Lista de IDs das pessoas que estão realizando a viagem',
        example: [1, 2, 3],
        type: [Number],
        required: true,
    })
    @IsArray()
    @IsNotEmpty()
    ID_pessoa: number[]

    @ApiProperty({
        description: 'Data e hora da viagem no formato ISO 8601',
        example: '2023-10-01T12:00:00Z',
        type: String,
        required: true,
    })
    @IsISO8601()
    @IsNotEmpty()
    DT_viagem: string
}
