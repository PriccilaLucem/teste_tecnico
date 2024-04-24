import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: Partial<Record<keyof Repository<User>, jest.Mock>>;
  config();
  beforeEach(async () => {
    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create and save a new user', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      const user = new User();
      user.email = 'test@example.com';
      user.password = 'password';

      repositoryMock.create.mockReturnValue(user);
      repositoryMock.save.mockResolvedValue(user);

      const result = await service.createUser(createUserDto);

      expect(result).toEqual(user);
      expect(repositoryMock.create).toHaveBeenCalledWith(createUserDto);
      expect(repositoryMock.save).toHaveBeenCalledWith(user);
    });
  });

  describe('login', () => {
    it('should return a token if email and password are correct', async () => {
      const loginData = { email: 'test@example.com', password: 'password' };
      const user = new User();
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password', 10);

      repositoryMock.findOne.mockResolvedValue(user);

      const result = await service.login(loginData);

      expect(typeof result).toBe('string');
      expect(result).toBeTruthy();
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should throw an error if user does not exist', async () => {
      const loginData = { email: 'test@example.com', password: 'password' };

      repositoryMock.findOne.mockResolvedValue(null);

      await expect(service.login(loginData)).rejects.toThrowError(
        HttpException,
      );
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should throw an error if password is incorrect', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      const user = new User();
      user.email = 'test@example.com';
      user.password = await bcrypt.hash('password', 10);

      repositoryMock.findOne.mockResolvedValue(user);

      await expect(service.login(loginData)).rejects.toThrowError(
        HttpException,
      );
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });
});
