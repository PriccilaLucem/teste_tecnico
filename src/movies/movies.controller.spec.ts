import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { HttpException } from '@nestjs/common';

describe('MovieService', () => {
  let service: MovieService;
  let repositoryMock: Partial<Record<keyof Repository<Movie>, jest.Mock>>;

  beforeEach(async () => {
    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerMovie', () => {
    it('should create and save a new movie', async () => {
      const movieDto = { movie_title: 'Test Movie' };
      const movie = new Movie();
      movie.movie_title = 'Test Movie';

      repositoryMock.create.mockReturnValue(movie);
      repositoryMock.save.mockResolvedValue(movie);

      const result = await service.registerMovie(movieDto);

      expect(result).toEqual(movie);
      expect(repositoryMock.create).toHaveBeenCalledWith(movieDto);
      expect(repositoryMock.save).toHaveBeenCalledWith(movie);
    });
  });

  describe('getAllMovies', () => {
    it('should return all movies', async () => {
      const movies = [new Movie(), new Movie()];
      repositoryMock.find.mockResolvedValue(movies);

      const result = await service.getAllMovies();

      expect(result).toEqual(movies);
      expect(repositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('getOneMovie', () => {
    it('should return a movie by ID if it exists', async () => {
      const movie = new Movie();
      const id = 1;

      repositoryMock.findOne.mockResolvedValue(movie);

      const result = await service.getOneMovie(id);

      expect(result).toEqual(movie);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: id },
      });
    });

    it('should throw an error if the movie does not exist', async () => {
      const id = 999;

      repositoryMock.findOne.mockResolvedValue(null);

      await expect(service.getOneMovie(id)).rejects.toThrowError(HttpException);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: id },
      });
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie by ID', async () => {
      const id = 1;

      await service.deleteMovie(id);

      expect(repositoryMock.delete).toHaveBeenCalledWith({ id });
    });
  });

  describe('putMovie', () => {
    it('should update a movie by ID', async () => {
      const id = 1;
      const movie_title = 'Updated Movie Title';
      const movieToUpdate = new Movie();
      movieToUpdate.id = id;
      movieToUpdate.movie_title = 'Original Movie Title';

      repositoryMock.findOne.mockResolvedValue(movieToUpdate);
      repositoryMock.save.mockResolvedValue(movieToUpdate);

      const result = await service.putMovie(id, movie_title);

      expect(result.movie_title).toEqual(movie_title);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: id },
      });
      expect(repositoryMock.save).toHaveBeenCalledWith(movieToUpdate);
    });

    it('should throw an error if the movie does not exist', async () => {
      const id = 999;
      const movie_title = 'Updated Movie Title';

      repositoryMock.findOne.mockResolvedValue(null);

      await expect(service.putMovie(id, movie_title)).rejects.toThrowError(
        HttpException,
      );
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { id: id },
      });
    });
  });
});
