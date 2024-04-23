import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class CatsController {
  @Post()
  findAll(): string {
    return 'This action returns all cats';
  }
}
