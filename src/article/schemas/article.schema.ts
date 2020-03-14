import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema( {
	title: String,
	description: String,
	url: String,
	source: String,
	image: String,
	tenant: String,
	timestamp: Date,
	views: Number
} );
