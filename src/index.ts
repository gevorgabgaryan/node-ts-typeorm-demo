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
  }
})();

process.on('unhandledRejection', (err) => {
  logger.error('unhandledRejection')
  logger.error(err)
  throw err
})

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException')
  logger.error(err)
})
