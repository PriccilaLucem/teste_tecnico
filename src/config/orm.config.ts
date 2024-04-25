import { configDotenv } from 'dotenv';
import { User } from 'src/user/user.entity';
import { Movie } from 'src/movies/movies.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

configDotenv();

export const PostgreSqlDataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  schema: process.env.DB_SCHEMA,
  entities: [User, Movie],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
};
