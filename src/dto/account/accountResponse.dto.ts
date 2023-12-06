import { AutoMap } from "@nartc/automapper"

export class AccountResponseDto {
    @AutoMap()
    bankName?: string
    @AutoMap()
    accountNumber: string
    @AutoMap()
    currencyIsoCode: string
    @AutoMap()
    accountName: string
}