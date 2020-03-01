import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const appOptions = { cors: true };
	const app = await NestFactory.create( AppModule, appOptions );

	const options = new DocumentBuilder()
		.setTitle( 'Football News' )
		.setDescription( 'Football article' )
		.setVersion( '1.0.0' )
		.addTag( 'articles' )
		.build();
	const document = SwaggerModule.createDocument( app, options );
	SwaggerModule.setup( 'api', app, document );
	app.useGlobalPipes( new ValidationPipe() );
	await app.listen( process.env.PORT || 3000 );
}

bootstrap();
