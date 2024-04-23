import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsController } from './controllers/user_controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './controllers/entities/user.entity';
import { config } from 'dotenv';

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
      entities: [User],
      synchronize: false, //mudar isso depoiss
    }),
  ],
  controllers: [CatsController],
  providers: [AppService],
})
export class AppModule {}
