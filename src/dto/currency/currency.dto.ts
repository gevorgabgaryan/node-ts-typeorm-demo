import { IsNotEmpty, IsString } from "class-validator";


export class CurrencyDto {
    @IsNotEmpty()
    @IsString()
    isoCode: string;

    @IsNotEmpty()
    @IsString()
    countryOrigin: string;

    @IsNotEmpty()
    @IsString()
    signCharacter: string;
  }