import 'reflect-metadata';
import App from './app';
import TypeORM from './typeorm';
import logger from './shared/logger';

(async () => {
  try {
    await TypeORM.init();
    await App.init();
  } catch (err) {
    logger.error('Initializing error', err)
    process.exit(1)
  }
})();
