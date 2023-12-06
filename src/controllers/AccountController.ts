import 'reflect-metadata';
import { Body, Get, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { AddAccountDto } from '../dto/account/addAccount.dto';
import { AccountService } from '../services/AccountService';

@Service()
@JsonController('/accounts')
export class AccountController {
  constructor(private accountService: AccountService) {

  }
  @Get('/')
  getAll() {
    return 'Account';
  }

  @Post('/add')
  async addAccount(@Body() account: AddAccountDto) {
      return await this.accountService.addAccount(account);
  }
}
