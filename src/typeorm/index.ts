import { appDataSource } from "./app-data-source"
import logger from "../shared/logger"
class TypeORM  {
 static async   init() {
        try {
           await appDataSource.initialize()
           logger.info("Db connection has been initialized!")
        } catch(err) {
            logger.error("Error during Db connection initialization:", err)
            throw err
        }
    }

    static async close() {
        try {
          await appDataSource.destroy();
          logger.info("Db connection has been closed!");
        } catch (err) {
          logger.error("Error during Db connection closing:", err);
          throw err;
        }
      }
}

export default TypeORM