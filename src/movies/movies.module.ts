// src/movies/movies.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieSchema } from './schema/movieSchema';
import { JwtStrategy } from 'src/auth/jwt/JwtStrategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema } from 'src/auth/schema/userSchema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }, {
    name: 'User',
    schema: UserSchema
  }])],
  controllers: [MoviesController],
  providers: [MoviesService, JwtService, JwtStrategy, AuthService],
})
export class MoviesModule { }
