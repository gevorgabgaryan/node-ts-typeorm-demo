import { AutoMap } from "@nartc/automapper"
import { IsNotEmpty, IsOptional } from "class-validator"


export class AccountResponseDto {
    @IsNotEmpty()
    @AutoMap()
    id: number
    @IsNotEmpty()
    @AutoMap()
    @IsOptional()
    bankName?: string
    @AutoMap()
    @IsNotEmpty()
    accountNumber: string
    @AutoMap()
    @IsNotEmpty()
    currencyIsoCode: string
    @AutoMap()
    accountName: string
}