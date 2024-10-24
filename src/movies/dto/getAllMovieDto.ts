// src/dto/pagination.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsOptional } from 'class-validator';

export class PaginationDto {
   @IsInt()
   @IsPositive()
   @IsOptional()
   @ApiProperty()
   page?: number = 1;

   @IsInt()
   @IsPositive()
   @ApiProperty()
   @IsOptional()
   limit?: number = 10;
}
