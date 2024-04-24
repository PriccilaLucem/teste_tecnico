import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MovieController } from './movies.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MoviesModule {}
