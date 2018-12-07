// const User = require('./models/user');
// const Comment = require('./models/comment');
const Post = require('./models/post');
const passport = require('passport');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const fs = require('fs');
const saltRounds = 10;

module.exports = (app) => {
	// just a route to check to see if things are working
	app.get('/api/', (req, res) => {
		const user = new User({ username: 'testing', password: 'hunter12' });
		user.save().then(() => {
			res.send({ hello: "world" });
		});
	});
	// make a new post
	app.post('/api/post', (req, res) => {
		console.log("in routes");
		console.log(req.body);
		let item = new Post(req.body);
		item.save((err, result) => {
			if (err) return res.json({ success: false, error: err });
			console.log(item);
			return res.json({ success: true });
		});
		// let form = new formidable.IncomingForm()
		// form.keepExtensions = true
		// form.parse(req, (err, fields, files) => {
		// 	if (err) {
		// 		return res.status(400).json({
		// 			error: "Image could not be uploaded"
		// 		})
		// 	}
		// 	let item = new Post(fields);
		// 	item['buy'] = 0;
		// 	item['nah'] = 0;
		// 	if(files.image){
		// 		item.image.data = fs.readFileSync(files.image.path);
		// 		item.image.contentType = files.image.type;
		// 	}
		// 	item.save((err, result) => {
		// 		if (err) return res.json({ success: false, error: err });
		// 		return res.json({ success: true });
		// 	});
		// });
	});

	// add a comment to a post
	// app.post('/api/post/:post_id', (req, res) => {
	// 	const { post_id } = req.params;
	// 	const data = req.body;
	//
	// 	Post.findById(post_id, (error, post) => {
	// 		if (error) return res.json({ success: false, error });
	// 		post.comments.push({ text: data.text});
	// 		post.save(error => {
	// 			if (error) return res.json({ success: false, error: error });
	// 			return res.json({ success: true });
	// 		});
	// 	});
	// });

	// add a comment or a vote to a post
	app.post('/api/post/:post_id', (req, res) => {
		const { post_id } = req.params;
		const data = req.body;

		Post.findById(post_id, (error, post) => {
			if (error) return res.json({ success: false, error });
			if (data.text) post.comments.push({ text: data.text});
			if (data.buy) post['buy'] = data.buy;
			if (data.nah) post['nah'] = data.nah;
			post.save(error => {
				if (error) return res.json({ success: false, error: error });
				return res.json({ success: true });
			});
		});
	});

	// get list of all posts
	app.get('/api/post/', (req, res) => {
		Post.find((err, posts) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true, data: posts });
		});
	});

	// delete a post
	app.delete('/api/post/:post_id', (req, res) => {
		const { post_id } = req.params;
		if (!post_id) {
			return res.json({ success: false, error: 'No post id provided' });
		}
		Post.remove({ _id: post_id }, (error, post) => {
			if (error) return res.json({ success: false, error });
			return res.json({ success: true });
		});
	});
	// delete a comment
	app.delete('/api/post/:post_id/:comment_id', (req, res) => {
		const post_id = req.params.post_id;
		const comment_id = req.params.comment_id;
		if (!post_id) {
			return res.json({ success: false, error: 'No post id provided' });
		}
		if (!comment_id) {
			return res.json({ success: false, error: 'No comment id provided' });
		}
		Post.findById( req.params.post_id , (error, post) => {
			if (error) return res.json({ success: false, error });
			post["comments"].remove({_id: comment_id});
			post.save(error => {
				if (error) return res.json({ success: false, error });
				return res.json({ success: true });
			});
		});
	});

	//user access routes
	// app.get('/signup', (req, res) => {
	//
	// });
	// app.get('/login', (req, res) => {
	//
	// });
	// app.get('/logout', (req, res) => {
	//
	// });
	// app.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }), () => {
	//
	// });
	// app.post('/signup/', (req, res) => {
	// 	const body = req.body;
	// 	const { username, password } = body;
	// 	console.log(body);
	// 	User.findOne({ username: username })
	// 		.then((users) => {
	// 			//check to see if the username is already in use
	// 			if (users) {
	// 				res.setHeader('Content-Type', 'application/json');
	// 				res.send({ error: true, in_use: true });
	// 			} else {
	// 				bcrypt.hash(password, saltRounds, function(err, hash) {
	// 					//store hash in the password DB.
	// 					const user = new User({ username: username, password: hash });
	// 					user.save()
	// 						.then(() => {
	// 							User.findOne({ username: user.username })
	// 								.then((user) => {
	// 									const id = user._id.toString();
	// 									console.log('Created new user: ' + id);
	// 										res.setHeader('Content-Type', 'application/json');
	// 										res.send({error: false});
	// 								});
	// 						});
	// 				});
	// 			};
	// 		}
	// 	);
	// });

	// // routes for comments when it was a separate entity from post
	// app.get('/comments', (req, res) => {
	// 	Comment.find((err, comments) => {
	// 		if (err) return res.json({ success: false, error: err });
	// 		return res.json({ success: true, data: comments });
	// 	});
	// });
	//
	// app.post('/comments', (req, res) => {
	// 	const comment = new Comment();
	// 	// body parser lets us use the req.body
	// 	const { body } = req.body;
	// 	console.log(req.body);
	// 	if (!body) {
	// 		// we should throw an error. we can do this check on the front end
	// 		return res.json({
	// 			success: false,
	// 			error: 'You must provide a body.'
	// 		});
	// 	}
	// 	comment.body = body;
	// 	comment.save(err => {
	// 		if (err) return res.json({ success: false, error: err });
	// 		return res.json({ success: true });
	// 	});
	// });
	//
	// app.put('/comments/:commentId', (req, res) => {
	// 	console.log(req.params);
	// 	const { commentId } = req.params;
	// 	if (!commentId) {
	// 		return res.json({ success: false, error: 'No comment id provided' });
	// 	}
	// 	Comment.findById(commentId, (error, comment) => {
	// 		if (error) return res.json({ success: false, error });
	// 		const { body } = req.body;
	// 		if (body) comment.body = body;
	// 		comment.save(error => {
	// 			if (error) return res.json({ success: false, error });
	// 			return res.json({ success: true });
	// 		});
	// 	});
	// });
	//



}
