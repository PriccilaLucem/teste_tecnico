import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { User } from './user/user.entity';
import { config } from 'dotenv';
import { Movie } from './movies/movies.entity';
import { MoviesModule } from './movies/movie.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      entities: [User, Movie],
      synchronize: true,
    }),

    UsersModule,
    MoviesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'movie*', method: RequestMethod.ALL });
  }
}
