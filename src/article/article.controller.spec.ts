import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from "./services/article.service";
import { Article } from "./interfaces/article.interface";
import { getModelToken } from '@nestjs/mongoose';
import { CreateArticleDto } from "./dto/create-article.dto";

describe( 'Article Controller', () => {
	let controller: ArticleController;
	let articleService: ArticleService;

	class EventModel {
		constructor( private data ) {
		}

		create = jest.fn().mockResolvedValue( this.data );
		static findByArticleId = jest.fn().mockResolvedValue( {} );
		static findByTeam = jest.fn().mockResolvedValue( {} );
	}

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ ArticleController ],
			providers: [
				ArticleService,
				{ provide: getModelToken( 'Article' ), useClass: EventModel },
			]
		} ).compile();

		controller = module.get<ArticleController>( ArticleController );
		articleService = module.get<ArticleService>( ArticleService );
	} );

	describe( 'findByTeam', () => {
		it( 'should return an array of articles', async () => {
			const result = [
				{
					id: '123',
					title: 'Test Title',
					description: 'Test escription',
					source: 'Test source',
					url: 'https://google.com',
					image: 'https://google.com/image.jpg'
				}
			];
			// @ts-ignore
			jest.spyOn( articleService, 'findByTeam' ).mockImplementation( () => result );

			expect( await controller.findByTeam( 'team' ) ).toBe( result );
		} );
	} );

	describe( 'findByArticleId', () => {
		it( 'should return an article', async () => {
			const result =
				{
					id: '123',
					title: 'Test Title',
					description: 'Test escription',
					source: 'Test source',
					url: 'https://google.com',
					image: 'https://google.com/image.jpg'
				};
			// @ts-ignore
			jest.spyOn( articleService, 'findByArticleId' ).mockImplementation( () => result );

			expect( await controller.findById( 'celtic', '123' ) ).toBe( result );
		} );
	} );

	describe( 'create', () => {
		it( 'should create an article', async () => {
			const article: CreateArticleDto =
				{
					title: 'Test Title',
					description: 'Test escription',
					source: 'Test source',
					url: 'https://google.com',
					image: 'https://google.com/image.jpg',
					tenant: "celtic"
				};
			// @ts-ignore
			jest.spyOn( articleService, 'create' ).mockImplementation( () => article );

			expect( await controller.create( article ) ).toBe( article );
		} );
	} );

} );
