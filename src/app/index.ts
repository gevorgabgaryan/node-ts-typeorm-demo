import { createExpressServer, useContainer } from 'routing-controllers';
import controllers from '../controllers';
import { Container } from 'typedi';
import logger from '../shared/logger';
import Config from '../config';
import { CustomErrorHandler } from '../middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { openAPISpec } from '../shared/openAPI';
import { Application } from 'express';
import { Server } from 'http';


class App {
  static server: Server;
  static async init() {
    useContainer(Container);
    const app: Application = createExpressServer({
      cors: true,
      controllers,
      middlewares: [CustomErrorHandler],
      validation: {
        whitelist: true,
        forbidNonWhitelisted: true,
      },
      defaultErrorHandler: false,
    });

    const server = app.listen(Config.port, () => {
      logger.info(`Server is running on port ${Config.port}`);
    });
    App.server = server

    //swagger
    const swaggerJson = await openAPISpec();
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

    return server
  }

  static async close() {
    if (App.server) {
      App.server.close(() => {
        logger.info('Server closed.')
      });
    }
  }
}

export default App;
