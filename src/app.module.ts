import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserController } from './controllers/user_controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { config } from 'dotenv';
import { Movie } from './entities/movies.entity';
import { LoginController } from './controllers/login_controller';
import { MovieController } from './controllers/movies_controller';

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
      synchronize: false, //mudar isso depoiss
    }),
  ],
  controllers: [UserController, LoginController, MovieController],
  providers: [AppService],
})
export class AppModule {}
