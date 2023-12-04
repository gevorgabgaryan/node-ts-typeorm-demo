import App from './app';
import TypeORM from './typeorm';

(async () => {
  try {
    await TypeORM.init();
    await App.init();
  } catch (err) {
    console.error('Initializing error', err)
    process.exit(1)
  }
})();
