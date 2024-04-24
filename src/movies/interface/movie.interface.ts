import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty()
  movie_title: string;
}
