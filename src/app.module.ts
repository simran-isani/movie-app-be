import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { EnvConfig } from './utilities/environment/environmentConfig';
import { MoviesModule } from './movies/movies.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      load: [EnvConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DATABASE.MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule { }
