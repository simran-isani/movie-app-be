// src/movies/dto/create-movie.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  publisherYear: Date;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Media file to be uploaded',
  })
  image: any;
}
