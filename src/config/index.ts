import {config} from 'dotenv'
config()

const Config = {
   mysql: {
    port: process.env.MYSQL_DB_PORT ? parseInt(process.env.MYSQL_DB_PORT, 10) : 3306,
    userName: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
   }
}

export default Config
