const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

const commentSchema = new Schema({
	author: user,
    title: String,
    text: String,
});

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;