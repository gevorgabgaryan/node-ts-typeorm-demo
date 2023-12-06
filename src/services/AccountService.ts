import { appDataSource } from '../typeorm/app-data-source';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { Account } from '../typeorm/entity';
import { AccountResponseDto, AddAccountDto } from '../dto/account';
import { CurrencyService } from './CurrencyService';
import { BankService } from './BankService';
import { CustomError } from '../shared/customError';
import { Mapper } from '@nartc/automapper';

@Service()
export class AccountService {
  private accountRepo: Repository<Account>;

  constructor(
    private currencyService: CurrencyService,
    private bankService: BankService,
  ) {
    this.accountRepo = appDataSource.getRepository('Account');
  }

  async addAccount(addAccount: AddAccountDto) {
    try {
      const newAccount: Account = new Account();
      newAccount.accountNumber = addAccount.accountNumber;
      newAccount.accountName = addAccount.accountName;
      let currency = await this.currencyService.findCurrency(addAccount.currency);
      if (!currency) {
        currency = await this.currencyService.addCurrency(addAccount.currency);
      }
      newAccount.currency = currency;
      newAccount.currencyId = currency.id;
      if (addAccount.bankName) {
        const bank = await this.bankService.findBankByName(addAccount.bankName);
        if (!bank) {
          throw new CustomError(`bank ${addAccount.bankName} not found`);
        }
        newAccount.bankId = bank.id;
        newAccount.bank = bank;
      }
      const accountEntity = await this.accountRepo.save(newAccount);
      return Mapper.map(accountEntity, AccountResponseDto);
    } catch (e) {
      throw e;
    }
  }
}
