import { Body, Get, JsonController, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { AccountService } from '../services/AccountService';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AccountResponseDto } from '../dtos/account';
import { PostAccountSchema } from '../schemas/account';

@Service()
@JsonController('/accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}
  @Get('/')
  @OpenAPI({ summary: 'Get all accounts', tags: ['Account'] })
  getAll() {
    return this.accountService.getAll();
  }
  @Post('/add')
  @OpenAPI({
    summary: 'Add new account',
    tags: ['Account'],
    description: 'Endpoint to add a new account with the provided details.',
  })
  @ResponseSchema(AccountResponseDto)
  async addAccount(@Body() account: PostAccountSchema): Promise<AccountResponseDto> {
    return await this.accountService.addAccount(account);
  }
}
