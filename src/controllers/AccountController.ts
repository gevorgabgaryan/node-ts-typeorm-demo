import 'reflect-metadata';
import { Controller, Get } from 'routing-controllers';

@Controller('/banks')
export class AccountController {
  @Get('/')
  getAll() {
    return 'Account';
  }
}
