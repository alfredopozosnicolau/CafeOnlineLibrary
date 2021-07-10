const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema(
	{
		isbn: {
			type: String,
			required: true,
			unique: true
		},
		title: {
			type: String,
			required: true,
			unique: false
		},
		author: {
			type: String,
			required: true,
			unique: false
		},
		publication_year: {
			type: String,
			required: false, // the requirement documents doesnot specify that publication_year is required
			unique: false
		},
		publisher: {
			type: String,
			required: false,
			unique: false
		},
		image_url_s: {
			type: String,
			required: false,
			unique: false
		},
		image_url_m: {
			type: String,
			required: false,
			unique: false
		},
		image_url_l: {
			type: String,
			required: false,
			unique: false
        },
        copies: {
            type:Number,
            required:true,
            unique:false
        },
        available: {
            type:Number,
            required:true,
            unique:false
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('book', Book);
