// src/movies/movies.controller.ts
import {
   Controller,
   Post,
   Get,
   Patch,
   Delete,
   Param,
   Body,
   UseInterceptors,
   UploadedFile,
   Query,
   UseGuards,
   Req,
   Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { join } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMovieDto } from './dto/cerateMovieDto';
import { Movie } from './schema/movieSchema';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { PaginationDto } from './dto/getAllMovieDto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
   constructor(private readonly moviesService: MoviesService) { }

   @Post()
   @ApiOperation({ summary: 'Create a new movie' })
   @ApiConsumes('multipart/form-data')
   @ApiBearerAuth()
   @UseGuards(JwtAuthGuard)
   @UseInterceptors(
      FileInterceptor('image', {
         storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
               const fileExt = file.mimetype.split('/')[1];
               const filename = `${Date.now()}.${fileExt}`;
               cb(null, filename);
            },
         }),
      }),
   )
   async create(
      @Body() createMovieDto: CreateMovieDto,
      @UploadedFile() file: Express.Multer.File,
      @Req() req,
   ): Promise<Movie> {
      const imagePath = file ? join('uploads', file.filename) : '';
      return this.moviesService.create({ ...createMovieDto, image: imagePath }, req);
   }

   @Get()
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   async getMovies(@Query() paginationDto: PaginationDto): Promise<{ total: number; data: Movie[] }> {

      return this.moviesService.findAll(paginationDto);
   }
   @Get(':id')
   @ApiBearerAuth()
   @UseGuards(JwtAuthGuard)
   async findOne(@Param('id') id: string): Promise<Movie> {
      return this.moviesService.findOne(id);
   }

   @Delete(':id')
   @ApiBearerAuth()
   @UseGuards(JwtAuthGuard) @ApiBearerAuth()
   @UseGuards(JwtAuthGuard)
   async remove(@Param('id') id: string): Promise<Movie> {
      return this.moviesService.remove(id);
   }

   @Put(':id')
   @ApiOperation({ summary: 'Update a movie' })
   @ApiConsumes('multipart/form-data')
   @ApiBearerAuth()
   @UseGuards(JwtAuthGuard)
   @UseInterceptors(
      FileInterceptor('image', { // Use the same interceptor as in create
         storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
               const fileExt = file.mimetype.split('/')[1];
               const filename = `${Date.now()}.${fileExt}`;
               cb(null, filename);
            },
         }),
      }),
   )
   @ApiBody({
      description: 'Update movie data including optional image upload',
      type: CreateMovieDto,
      required: true,
   })
   async update(
      @Param('id') id: string,
      @Body() updateMovieDto: CreateMovieDto,
      @UploadedFile() image: Express.Multer.File,
      @Req() req,
   ): Promise<Movie> {
      const imagePath = image ? join('uploads', image.filename) : undefined;
      console.log("🚀 ~ MoviesController ~ imagePath:", imagePath);

      return this.moviesService.update(req, id, updateMovieDto, imagePath);
   }
}
