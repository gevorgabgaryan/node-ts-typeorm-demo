import { appDataSource } from "./app-data-source"

class TypeORM  {
 static async   init() {
        try {
           await appDataSource.initialize()
           console.log("Data Source has been initialized!")
        } catch(err) {
            console.error("Error during Data Source initialization:", err)
            throw err
        }
    }
}

export default TypeORM