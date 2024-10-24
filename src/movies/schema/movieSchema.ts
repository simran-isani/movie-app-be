// NPM Packages
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie extends Document {
   @Prop()
   title: string;

   @Prop()
   publisherYear: Date;

   @Prop()
   image: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
