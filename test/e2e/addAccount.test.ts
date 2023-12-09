import TypeORM from '../../src/typeorm';
import App from '../../src/app';
import request from 'supertest';
import { Server } from 'http';
import { appDataSource } from '../../src/typeorm/app-data-source';
import logger from '../../src/shared/logger';
import { PostAccountSchema } from '../../src/schemas/account';


let server: Server;
const testBank = 'TestBank';
const testCurrency = 'btc';
const testAccount = 'testAccount';
describe('testing account API', () => {
  beforeAll(async () => {
    try {
      await TypeORM.init();
      server = await App.init();
      await appDataSource.getRepository('Bank').save({ name: testBank });
    } catch (e) {
      logger.error(e);
    }
  });

  afterAll(async () => {
    try {
      await appDataSource.getRepository('Account').delete({ accountName: testAccount });
      await appDataSource.getRepository('Bank').delete({ name: testBank });
      await appDataSource.getRepository('Currency').delete({ isoCode: testCurrency });
      await TypeORM.close();
      await App.close();
    } catch (e) {
      logger.error(e);
    }
  });

  it('add new account', async () => {
    const newAccount = {
      bankName: testBank,
      accountNumber: '1001',
      currency: {
        isoCode: testCurrency,
        countryOrigin: 'USA',
        signCharacter: '$',
      },
      accountName: testAccount,
    };
    const res = await request(server).post('/accounts/add').send(newAccount);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: res.body.id,
        bankName: testBank,
        accountNumber: '1001',
        currencyIsoCode: testCurrency,
        accountName: testAccount,
      }),
    );
  });

  it('add new account bank is not found error', async () => {
    const newAccount: PostAccountSchema = {
      bankName: 'testBank1',
      accountNumber: '1001',
      currency: {
        isoCode: testCurrency,
        countryOrigin: 'USA',
        signCharacter: '$',
      },
      accountName: testAccount,
    };
    const res = await request(server).post('/accounts/add').send(newAccount);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        code: 404,
        message: `bank ${newAccount.bankName} not found`,
      }),
    );
  });

  it('add new account with bad request body', async () => {
    const newAccount = {
      bankName: testBank,
      accountNumber: '1001',
      currency: {
        isoCode: testCurrency,
        countryOrigin: 'USA',
        signCharacter: '$',
      },
    };
    const res = await request(server).post('/accounts/add').send(newAccount);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        code: 400,
        message: 'Invalid request schema',
        details: expect.objectContaining({
          accountName: expect.arrayContaining(['accountName should not be empty', 'accountName must be a string']),
        }),
      }),
    );
  });
});
