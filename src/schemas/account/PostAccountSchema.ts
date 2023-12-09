import { IsNotEmpty,  IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CurrencySchema } from '../currency';

export class PostAccountSchema {
  @IsString()
  @IsOptional()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ValidateNested({ each: true })
  @Type(() => CurrencySchema)
  @IsNotEmpty()
  currency: CurrencySchema;

  @IsString()
  @IsNotEmpty()
  accountName: string;
}