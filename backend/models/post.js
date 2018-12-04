const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');
const comment = require('./comment');

const postSchema = new Schema({
	image: {
		data: Buffer,
		contentType: String
	},
    title: String,
    description: String,
    comments: [comment]
    author: user,
});

const post = mongoose.model('post', postSchema);

module.exports = post;