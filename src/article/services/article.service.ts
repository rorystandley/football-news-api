import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from "../interfaces/article.interface";
import { CreateArticleDto } from "../dto/create-article.dto";

@Injectable()
export class ArticleService {
	constructor( @InjectModel( 'Article' ) private readonly articleModel: Model<Article> ) {
	}

	async create( team, createArticleDto: CreateArticleDto ): Promise<Article> {
		createArticleDto.tenant = team;
		createArticleDto.timestamp = new Date();
		createArticleDto.views = 0;
		const createdCat = new this.articleModel( createArticleDto );
		return createdCat.save();
	}

	async findByArticleId( id: string ): Promise<Article> {
		const article = await this.articleModel.findById( id );
		return {
			id: article.id,
			title: article.title,
			description: article.description,
			source: article.source,
			url: article.url,
			image: article.image,
			views: article.views,
			timestamp: article.timestamp
		}
	}

	async findByTeam( tenant: string ): Promise<Article[]> {
		const articles = await this.articleModel.find( { tenant: tenant } );
		return articles.map( article => ({
			id: article.id,
			title: article.title,
			description: article.description,
			source: article.source,
			url: article.url,
			image: article.image
		}) )
	}
}
