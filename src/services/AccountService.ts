import 'reflect-metadata';
import { appDataSource } from '../typeorm/app-data-source';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { Account } from '../typeorm/entity';
import { AccountResponseDto } from '../dtos/account';
import { CurrencyService, BankService } from './index';
import { CustomError } from '../shared/customError';
import { Mapper } from '@nartc/automapper';
import { PostAccountSchema } from '../schemas/account';

@Service()
export class AccountService {
  private accountRepo: Repository<Account> = appDataSource.getRepository('Account');

  constructor(
    private currencyService: CurrencyService,
    private bankService: BankService,
  ) {}

  async getAll() {
    try {
      const accountEntities = await this.accountRepo.find({ relations: ['currency', 'bank'] });
      return accountEntities.map((entity) => Mapper.map(entity, AccountResponseDto));
    } catch (e) {
      throw e;
    }
  }

  /**
   * Adds a new account based on the information provided in the PostAccountSchema.
   * @param addAccount - The data representing the new account to be added.
   * @returns A Promise resolving to the newly added account, transformed to the AccountResponseDto.
   * @throws CustomError if there is an issue with the bank name or currency.
   */

  async addAccount(addAccount: PostAccountSchema): Promise<AccountResponseDto> {
    try {
      const newAccount: Account = new Account();
      newAccount.accountNumber = addAccount.accountNumber;
      newAccount.accountName = addAccount.accountName;

      if (addAccount.bankName) {
        const bank = await this.bankService.findBankByName(addAccount.bankName);
        if (!bank) {
          throw new CustomError(`bank ${addAccount.bankName} not found`);
        }
        newAccount.bankId = bank.id;
        newAccount.bank = bank;
      }
      let currency = await this.currencyService.findCurrency(addAccount.currency);
      if (!currency) {
        currency = await this.currencyService.addCurrency(addAccount.currency);
      }
      newAccount.currency = currency;
      newAccount.currencyId = currency.id;
      const accountEntity = await this.accountRepo.save(newAccount);
      return Mapper.map(accountEntity, AccountResponseDto);
    } catch (e) {
      throw e;
    }
  }
}
