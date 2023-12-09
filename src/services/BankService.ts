import { appDataSource } from '../typeorm/app-data-source';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { Bank } from '../typeorm/entity';

@Service()
export class BankService {
  private BankRepo: Repository<Bank> = appDataSource.getRepository('Bank');

  async findBankByName(name: string) {
    return await this.BankRepo.findOneBy({ name });
  }
}
