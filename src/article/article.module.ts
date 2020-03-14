import { Module, NestModule } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from "./schemas/article.schema";
import { ArticleService } from "./services/article.service";

@Module( {
	imports: [
		MongooseModule.forFeature( [ { name: 'Article', schema: ArticleSchema } ] )
	],
	providers: [
		ArticleService
	],
	controllers: [
		ArticleController
	]
} )
export class ArticleModule implements NestModule {
	public configure() {

	}

}
