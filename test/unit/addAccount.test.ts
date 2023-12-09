import { AccountService, BankService, CurrencyService } from '../../src/services';
import { Account } from '../../src/typeorm/entity';
import { Repository } from 'typeorm';
import { Mapper } from '@nartc/automapper';
import { CustomError } from '../../src/shared/customError';
import { PostAccountSchema } from '../../src/schemas/account';


describe('add account', () => {
  let accountService: AccountService;
  let currencyService: CurrencyService;
  let bankService: BankService;
  let mockRepository: Repository<Account>;

  beforeEach(() => {
    jest.clearAllMocks();
    currencyService = new CurrencyService();
    bankService = new BankService();

    mockRepository = {
      find: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Account>;

    accountService = new AccountService(currencyService, bankService);
    accountService['accountRepo'] = mockRepository;
  });

  describe('add account', () => {
    describe('when bank is found and currency not found', () => {
      it('should add a new account and return a response of type AccountResponseDto', async () => {
        const addAccount: PostAccountSchema = {
          bankName: 'CBA',
          accountName: 'Crypto',
          accountNumber: '3020',
          currency: {
            isoCode: 'ETH',
            countryOrigin: 'Russian',
            signCharacter: 'E',
          },
        };

        jest.spyOn(currencyService, 'findCurrency').mockResolvedValueOnce(null);
        jest.spyOn(currencyService, 'addCurrency').mockResolvedValueOnce({
          id: 1,
          isoCode: 'ETH',
          countryOrigin: 'Russian',
          signCharacter: 'E',
        });

        jest.spyOn(bankService, 'findBankByName').mockResolvedValueOnce({
          id: 1,
          name: addAccount.bankName,
        });

        jest.spyOn(mockRepository, 'save').mockResolvedValueOnce({
          id: 1,
          accountName: addAccount.accountName,
          accountNumber: addAccount.accountNumber,
          currencyId: 1,
          bankId: 1,
        } as Account);

        jest.spyOn(Mapper, 'map').mockImplementation((entity) => entity);

        const result = await accountService.addAccount(addAccount);

        expect(result).toEqual({
          id: 1,
          accountName: addAccount.accountName,
          accountNumber: addAccount.accountNumber,
          currencyId: 1,
          bankId: 1,
        });
      });
    });
  });
  describe('when bank is found and currency already exists', () => {
    it('should add a new account and return a response of type AccountResponseDto', async () => {
      const addAccount: PostAccountSchema = {
        bankName: 'CBA',
        accountName: 'Crypto',
        accountNumber: '3020',
        currency: {
          isoCode: 'ETH',
          countryOrigin: 'Russian',
          signCharacter: 'E',
        },
      };

      jest.spyOn(currencyService, 'findCurrency').mockResolvedValueOnce({
        id: 1,
        isoCode: 'ETH',
        countryOrigin: 'Russian',
        signCharacter: 'E',
      });

      jest.spyOn(bankService, 'findBankByName').mockResolvedValueOnce({
        id: 1,
        name: addAccount.bankName,
      });

      jest.spyOn(mockRepository, 'save').mockResolvedValueOnce({
        id: 1,
        accountName: addAccount.accountName,
        accountNumber: addAccount.accountNumber,
        currencyId: 1,
        bankId: 1,
      } as Account);

      jest.spyOn(Mapper, 'map').mockImplementation((entity) => entity);

      const result = await accountService.addAccount(addAccount);

      expect(result).toEqual({
        id: 1,
        accountName: addAccount.accountName,
        accountNumber: addAccount.accountNumber,
        currencyId: 1,
        bankId: 1,
      });
    });
  });

  describe('when bank is not found', () => {
    it('should throw a CustomError with status code 404', async () => {
      const addAccount: PostAccountSchema = {
        bankName: 'NonExistingBank',
        accountName: 'Crypto',
        accountNumber: '3020',
        currency: {
          isoCode: 'ETH',
          countryOrigin: 'Russian',
          signCharacter: 'E',
        },
      };

      jest.spyOn(bankService, 'findBankByName').mockResolvedValueOnce(null);

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

  describe('when an error occurs during save', () => {
    it('should throw the error', async () => {
      const addAccount: PostAccountSchema = {
        bankName: 'CBA',
        accountName: 'Crypto',
        accountNumber: '3020',
        currency: {
          isoCode: 'ETH',
          countryOrigin: 'Russian',
          signCharacter: 'E',
        },
      };

      jest.spyOn(currencyService, 'findCurrency').mockResolvedValueOnce({
        id: 1,
        isoCode: 'ETH',
        countryOrigin: 'Russian',
        signCharacter: 'E',
      });

      jest.spyOn(bankService, 'findBankByName').mockResolvedValueOnce({
        id: 1,
        name: addAccount.bankName,
      });

      jest.spyOn(mockRepository, 'save').mockRejectedValueOnce(new Error('Save error'));

      try {
        await accountService.addAccount(addAccount);
        fail('Expected error');
      } catch (error: unknown) {
        expect(error instanceof Error).toBe(true);
      }
    });
  });
});
