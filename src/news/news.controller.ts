import { Controller, Get } from '@nestjs/common';

@Controller( 'news' )
export class NewsController {
	@Get()
	findAll() {
		return [
			{
				title: 'News Article 1'
			}
		]
	}
}
