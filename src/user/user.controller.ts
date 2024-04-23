import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from 'src/user/interface/user.interface';
import { UserService } from './user.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserDto): Promise<any> {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return {
        id: newUser.id,
        email: newUser.email,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
