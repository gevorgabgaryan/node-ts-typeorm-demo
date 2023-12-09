import { IsNotEmpty, IsString } from "class-validator";


export class CurrencySchema {
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