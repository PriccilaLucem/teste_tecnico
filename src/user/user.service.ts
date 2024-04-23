import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/interface/user.interface';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
// import { config } from 'dotenv';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private readonly jwtSecret: string = process.env.SECRET_KEY;

  async createUser(createUserDto: UserDto): Promise<User> {
    const { email, password } = createUserDto;
    const newUser = this.userRepository.create({ email, password });
    return await this.userRepository.save(newUser);
  }

  async login(loginData: UserDto): Promise<string> {
    const { email, password } = loginData;
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const token = jwt.sign({ email: user.email, id: user.id }, this.jwtSecret);
    return token;
  }
}
