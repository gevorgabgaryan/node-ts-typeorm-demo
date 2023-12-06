import { appDataSource } from "./app-data-source"
import logger from "../shared/logger"

class TypeORM  {
 static async   init() {
        try {
           await appDataSource.initialize()
           logger.info("Data Source has been initialized!")
        } catch(err) {
            logger.error("Error during Data Source initialization:", err)
            throw err
        }
    }

    static async close() {
        try {
          await appDataSource.close();
          logger.info("Data Source has been closed!");
        } catch (err) {
          logger.error("Error during Data Source closing:", err);
          throw err;
        }
      }
}

export default TypeORM