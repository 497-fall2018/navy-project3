const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

const commentSchema = new Schema({
	//author: user,
    text: String,
});

const postSchema = new Schema({
	image: {
		data: Buffer,
		contentType: String
	},
    title: String,
    description: String,
    comments: [commentSchema],
    buy: Number,
    nah: Number
    //author: user,
});

const post = mongoose.model('post', postSchema);

module.exports = post;
