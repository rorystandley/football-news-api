import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
	@IsNotEmpty()
	readonly title: string;
	@IsNotEmpty()
	readonly description: string;
	@IsNotEmpty()
	readonly url: string;
	@IsNotEmpty()
	readonly source: string;
	readonly image: string;
	@IsNotEmpty()
	readonly tenant: string
}
