import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movie.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { PostgreSqlDataSource } from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
    TypeOrmModule.forRoot(PostgreSqlDataSource),

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
