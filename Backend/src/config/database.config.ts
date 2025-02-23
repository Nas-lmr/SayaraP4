import "dotenv/config";
import { DataSourceOptions } from "typeorm";

export const databaseConfig: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: false,
};
