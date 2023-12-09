
import { PostAccountSchema } from '../../src/schemas/account';
import { AccountService, BankService, CurrencyService } from '../../src/services';
import { CustomError } from '../../src/shared/customError';
import logger from '../../src/shared/logger';
import TypeORM from '../../src/typeorm';
import { appDataSource } from '../../src/typeorm/app-data-source';
const testBank = 'TestBank';
const testCurrency = 'btc';
const testAccount = 'testAccount';


describe('AccountService', () => {
  let accountService: AccountService;
  let bankService: BankService;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    try {
      await TypeORM.init();
      await appDataSource.getRepository('Bank').save({ name: testBank });
      currencyService = new CurrencyService();
      bankService = new BankService();
      accountService = new AccountService(currencyService, bankService);
    } catch (e) {
      logger.error(e);
    }
  });

  afterEach(async () => {
    try {
      await appDataSource.getRepository('Account').delete({ accountName: testAccount });
      await appDataSource.getRepository('Bank').delete({ name: testBank });
      await appDataSource.getRepository('Currency').delete({ isoCode: testCurrency });
      await TypeORM.close();
    } catch (e) {
      logger.error(e);
    }
  });

  describe('add account', () => {
    it('should add a new account and return a response of type AccountResponseDto', async () => {
      const addAccount: PostAccountSchema = {
        bankName: testBank,
        accountName: testAccount,
        accountNumber: '3020',
        currency: {
          isoCode: testCurrency,
          countryOrigin: 'Russian',
          signCharacter: 'E',
        },
      };

      const result = await accountService.addAccount(addAccount);

      expect(result).toEqual({
        id: result.id,
        accountName: testAccount,
        accountNumber: addAccount.accountNumber,
        bankName: testBank,
        currencyIsoCode: testCurrency,
      });
    });
  });

  it('should retun bank not found error', async () => {
    const addAccount: PostAccountSchema = {
      bankName: 'testBank1',
      accountName: testAccount,
      accountNumber: '3020',
      currency: {
        isoCode: testCurrency,
        countryOrigin: 'Russian',
        signCharacter: 'E',
      },
    };

    try {
      await accountService.addAccount(addAccount);
      fail('Expected CustomError');
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        expect(error.httpCode).toBe(404);
        expect(error.message).toBe(`bank ${addAccount.bankName} not found`);
      } else {
        fail(`Unexpected error type: ${error}`);
      }
    }
  });
});
