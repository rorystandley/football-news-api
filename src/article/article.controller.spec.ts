import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from "./article.service";
import { Article } from "./article.interface";
import { getModelToken } from '@nestjs/mongoose';

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
			controllers: [ArticleController],
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

} );
