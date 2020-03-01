import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
	@IsNotEmpty()
	readonly title: string;
	@IsNotEmpty()
	readonly tenant: string
}
