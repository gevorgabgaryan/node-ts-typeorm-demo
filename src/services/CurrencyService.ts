import { appDataSource } from '../typeorm/app-data-source';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { Currency } from '../typeorm/entity';
import { CurrencyDto } from '../dtos/currency';

@Service()
export class CurrencyService {
  private CurrencyRepo: Repository<Currency> = appDataSource.getRepository('Currency');

  async findCurrency(currency: CurrencyDto) {
    return await this.CurrencyRepo.findOneBy(currency);
  }

  async addCurrency(currency: CurrencyDto) {
    return await this.CurrencyRepo.save(currency);
  }
}
