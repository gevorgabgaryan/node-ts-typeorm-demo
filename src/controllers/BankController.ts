import 'reflect-metadata'
import { Controller, Get } from 'routing-controllers';

@Controller('/banks')
export class BankController {
    @Get('/')
    getAll() {
        return 'CBA'
    }
}

