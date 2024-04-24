import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { User } from './user/user.entity';
import { config } from 'dotenv';
import { Movie } from './movies/movies.entity';
import { MoviesModule } from './movies/movie.module';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Movie],
      synchronize: true,
    }),
    UsersModule,
    MoviesModule,
  ],
})
export class AppModule {}
