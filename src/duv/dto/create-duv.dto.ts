import { IsArray, IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDuvDto {
    @IsNumber()
    @IsNotEmpty()
    ID_navio: number

    @IsArray()
    @IsNotEmpty()
    ID_pessoa: number[]

    @IsISO8601()
    @IsNotEmpty()
    DT_viagem: string
}
