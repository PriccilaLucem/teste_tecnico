import { Controller, Get, Delete, Post } from '@nestjs/common';

@Controller('movies')
export class Movies {
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
