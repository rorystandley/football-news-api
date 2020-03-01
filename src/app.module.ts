import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from "./article/article.module";
import { MongooseModule } from '@nestjs/mongoose';

@Module( {
	imports: [
		ArticleModule,
		MongooseModule.forRoot('mongodb://localhost/news')
	],
	controllers: [ AppController ],
	providers: [],
} )
export class AppModule {
}
