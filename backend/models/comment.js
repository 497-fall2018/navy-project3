const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./models/user');

const commentSchema = new Schema({
    body: String,
}, { timestamps: true });

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
