import { IsNotEmpty,  IsObject,  IsOptional,  IsString,   ValidateNested } from "class-validator";
import { CurrencyDto } from "../currency";
import { Type } from 'class-transformer';

export class AddAccountDto {
    @IsString()
    @IsOptional()
    bankName: string

    @IsString()
    @IsNotEmpty()
    accountNumber: string

    @IsObject()
    @IsNotEmpty()
    @Type(() => CurrencyDto)
    @ValidateNested({each: true})
    currency: CurrencyDto;

    @IsString()
    @IsNotEmpty()
    accountName: string

}