import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from "./article.interface";
import { CreateArticleDto } from "./create-article.dto";

@Injectable()
export class ArticleService {
	constructor( @InjectModel( 'Article' ) private readonly articleModel: Model<Article> ) {
	}

	async create( createArticleDto: CreateArticleDto ): Promise<Article> {
		const createdCat = new this.articleModel( createArticleDto );
		return createdCat.save();
	}

	async findByArticleId( id ): Promise<Article[]> {
		return this.articleModel.findById( id ).exec();
	}

	async findByTeam( tenant ): Promise<Article[]> {
		return this.articleModel.find( { tenant: tenant } ).exec();
	}
}
