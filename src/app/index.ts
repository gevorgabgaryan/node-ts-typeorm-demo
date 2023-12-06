import { createExpressServer, useContainer} from 'routing-controllers';
import { AccountController } from '../controllers/AccountController';
import { Container } from 'typedi';
import logger from '../shared/logger';
import Config from '../config';
import { CustomErrorHandler } from '../middlewares/errorHandler';

class App {
  static async init() {

    useContainer(Container);
    const app = createExpressServer({
      cors: true,
      controllers: [AccountController],
      middlewares: [CustomErrorHandler],
      validation: {
        whitelist: true,
        forbidNonWhitelisted: true
      },
      defaultErrorHandler: false,
    });

    app.listen(Config.port, () => {
      logger.info(`Server is running on port ${Config.port}`);
    });
  }
}

export default App