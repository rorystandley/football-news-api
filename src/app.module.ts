import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from "./article/article.module";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module( {
	imports: [
		ArticleModule,
		MongooseModule.forRootAsync( {
			imports: [ ConfigModule ],
			useFactory: async ( configService: ConfigService ) => ({
				uri: configService.get( 'DB_CONNECTION' ),
				useNewUrlParser: true,
				useUnifiedTopology: true
			}),
			inject: [ ConfigService ],
		} ),
		ConfigModule.forRoot()
	],
	controllers: [ AppController ],
	providers: [
		ConfigService
	],
} )
export class AppModule {
}
