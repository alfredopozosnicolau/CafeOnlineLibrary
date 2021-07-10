const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
	{
		lib_Id: {
			type: String,
			required: true,
			unique: true
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true
		},
		activeLoans: [
			{
				books: [
					{
						isbn: {
							type: String,

							unique: true
						},
						title: {
							type: String,

							unique: false
						}
					}
				],
				lonedTime: {
					type: Date,
					default: Date.now
				}
			}
		],
		historyLoans: [
			{
				books: [
					{
						isbn: {
							type: String,
							unique: true
						},
						title: {
							type: String,
							unique: false
						}
					}
				],
				time: [
					{
						lonedTime: {
							type: Date
						},
						returnedTime: {
							type: Date,
							default: Date.now
						}
					}
				]
			}
		]
	},
	{ timestamps: true }
);
module.exports = mongoose.model('user', User);