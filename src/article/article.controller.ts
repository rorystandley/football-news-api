import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateArticleDto } from "./dto/create-article.dto";
import { ArticleService } from "./services/article.service";

@ApiTags( 'articles' )
@Controller( 'articles' )
export class ArticleController {

	constructor( private readonly articleService: ArticleService ) {
	}

	@ApiOperation( { summary: 'Get all articles for a given team' } )
	@ApiResponse( { status: 200, description: 'Return all articles for a team.' } )
	@Get( ':team' )
	async findByTeam( @Param( 'team' ) team ) {
		return await this.articleService.findByTeam( team );
	}

	@ApiOperation( { summary: 'Get article by id' } )
	@ApiResponse( { status: 200, description: 'Return article by id.' } )
	@Get( ':team/:id' )
	async findById( @Param( 'team' ) team, @Param( 'id' ) id ) {
		return await this.articleService.findByArticleId( id );
	}

	@ApiOperation( { summary: 'Create an article for a team' } )
	@Post( ':team' )
	async create( @Body() createArticleDto: CreateArticleDto ) {
		return await this.articleService.create( createArticleDto );
	}

}
