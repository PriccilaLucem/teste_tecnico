import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from 'src/user/interface/user.interface';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common';

@Controller('login')
export class LoginController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() loginDto: UserDto): Promise<any> {
    try {
      const token = await this.userService.login(loginDto);
      return { token: token };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
