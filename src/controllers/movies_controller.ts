import { Controller, Get, Delete, Post } from '@nestjs/common';

@Controller('movie')
export class MovieController {
  @Get()
  getOne(): string {
    return '';
  }

  @Post()
  postMovie(): string {
    return '';
  }

  @Delete()
  deleteMovie(): string {
    return '';
  }
}
