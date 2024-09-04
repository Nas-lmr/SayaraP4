import { DataSourceOptions } from 'typeorm';
import { CityEntity } from 'src/city/entity/city.entity';
import 'dotenv/config';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3000'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

//entities: [__dirname + '/../../*/.entity{.ts,.js}'],

