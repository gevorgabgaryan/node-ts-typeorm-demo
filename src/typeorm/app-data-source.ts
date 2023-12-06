
import { DataSource } from "typeorm"
import { Account, Currency, Bank } from "./entity"
import Config from '../config'

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: Config.mysql.port,
    username: Config.mysql.userName,
    password: Config.mysql.password,
    database: Config.mysql.database,
    entities: [Account, Currency, Bank],
    logging: false,
    synchronize: true,
})
