import { IsNotEmpty, IsString } from "class-validator";

export class CreateNavioDto {
    @IsString()
    @IsNotEmpty()
    NO_navio: string;

    @IsString()
    @IsNotEmpty()
    DS_bandeira: string;
}
