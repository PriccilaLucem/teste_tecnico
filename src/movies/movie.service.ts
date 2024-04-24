import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { MovieDto } from './interface/movie.interface';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  private readonly jwtSecret: string = process.env.SECRET_KEY;

  async registerMovie(MovieDto: MovieDto): Promise<Movie> {
    const { movie_title } = MovieDto;
    const newMovie = this.movieRepository.create({ movie_title });
    return await this.movieRepository.save(newMovie);
  }
  async getAllMovies(): Promise<Movie[]> {
    const movies = await this.movieRepository.find();
    return movies;
  }
  async getOneMovie(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id: id },
    });
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }
  async deleteMovie(id: number): Promise<void> {
    await this.movieRepository.delete({ id: id });
  }
  async putMovie(id: number, movie_title: string): Promise<Movie> {
    const movieToUpdate = await this.movieRepository.findOne({
      where: { id: id },
    });
    if (!movieToUpdate) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    movieToUpdate.movie_title = movie_title;
    const updatedMovie = await this.movieRepository.save(movieToUpdate);
    return updatedMovie;
  }
}
