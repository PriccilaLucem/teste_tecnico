import {
  Controller,
  Get,
  Delete,
  Post,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movies.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MovieDto } from './interface/movie.interface';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAllMovies(): Promise<Movie[]> {
    const movies = await this.movieService.getAllMovies();
    return movies;
  }

  @Post()
  async postMovie(@Body() movieDto: MovieDto): Promise<Movie> {
    try {
      const movie = await this.movieService.registerMovie(movieDto);
      return { movie_title: movie.movie_title, id: movie.id };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number): HttpStatus {
    this.movieService.deleteMovie(id);
    return HttpStatus.NO_CONTENT;
  }
  @Get(':id')
  async getOneMovie(@Param('id') id: number): Promise<Movie> {
    const movie = await this.movieService.getOneMovie(id);
    return movie;
  }
  @Put(':id')
  async putMovie(
    @Param('id') id: number,
    @Body() MovieDto: MovieDto,
  ): Promise<Movie> {
    try {
      const movie = await this.movieService.putMovie(id, MovieDto.movie_title);
      return { id: movie.id, movie_title: movie.movie_title };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
