// src/movies/movies.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schema/movieSchema';
import { CreateMovieDto } from './dto/cerateMovieDto';
import { PaginationDto } from './dto/getAllMovieDto';
import { Roles } from 'src/shared /enums';

@Injectable()
export class MoviesService {
   constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) { }


   async create(createMovieDto: CreateMovieDto & { image: string }, req): Promise<Movie> {
      // only for admin 
      if (!req.user.role.includes(Roles.ADMIN)) {
         throw new BadRequestException('Admin permission required');
      }

      const newMovie = new this.movieModel(createMovieDto);
      return newMovie.save();
   }

   async findById(id: string): Promise<Movie> {
      return this.movieModel.findById(id).exec();
   }

   async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Movie>> {
      const { page, limit } = paginationDto;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
         this.movieModel.find().skip(skip).limit(limit).exec(),
         this.movieModel.countDocuments().exec(), // Get the total count of documents
      ]);

      return { total, data };
   }

   async findOne(id: string): Promise<Movie> {
      const movie = await this.movieModel.findById(id).exec();
      if (!movie) {
         throw new NotFoundException(`Movie with ID ${id} not found`);
      }
      return movie;
   }

   async update(req: any, id: string, updateMovieDto: CreateMovieDto, imagePath?: string): Promise<Movie> {
      // only for admin 
      if (!req.user.role.includes(Roles.ADMIN)) {
         throw new BadRequestException('Admin permission required');
      }

      const movie = await this.movieModel.findByIdAndUpdate(
         id,
         { ...updateMovieDto, ...(imagePath ? { image: imagePath } : {}) },
         { new: true }
      ).exec();
      if (!movie) {
         throw new NotFoundException(`Movie with ID ${id} not found`);
      }
      return movie;
   }

   async remove(id: string): Promise<Movie> {
      const movie = await this.movieModel.findByIdAndDelete(id).exec();
      if (!movie) {
         throw new NotFoundException(`Movie with ID ${id} not found`);
      }
      return movie;
   }
}
