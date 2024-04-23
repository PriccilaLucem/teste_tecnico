import { Controller, Post } from '@nestjs/common';

@Controller('login')
export class CatsController {
  @Post()
  findAll(): string {
    return 'This action returns all cats';
  }
}
