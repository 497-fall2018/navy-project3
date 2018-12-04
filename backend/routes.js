const User = require('./models/user');
const Comment = require('./models/comment')
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (app) => {
	//just a route to check to see if things are working
	app.get('/api/', (req, res) => {
		const user = new User({ username: 'testing', password: 'hunter12' });
		user.save().then(() => {
			res.send({ hello: "world" });
		});
	});

	//user access routes
	app.get('/signup', (req, res) => {
		res.render('../views/signup.ejs');
	});
	app.get('/login', (req, res) => {
		res.render('../views/login.ejs');
	});
	app.get('/logout', (req, res) => {
		req.logout();
		req.session.destroy(() => {
			res.clearCookie('connect.sid');
			res.redirect('/login');
		})
	});
	app.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }),
		(req, res) => {
			//res.redirect('/');
			res.send({error: false});
		});
	app.post('/signup/', (req, res) => {
		const body = req.body;
		const { username, password } = body;
		console.log(body);
		User.findOne({ username: username })
			.then((users) => {
				//check to see if the username is already in use
				if (users) {
					res.setHeader('Content-Type', 'application/json');
					res.send({ error: true, in_use: true });
				} else {
					bcrypt.hash(password, saltRounds, function(err, hash) {
						//store hash in the password DB.
						const user = new User({ username: username, password: hash });
						user.save()
							.then(() => {
								User.findOne({ username: user.username })
									.then((user) => {
										const id = user._id.toString();
										console.log('Created new user: ' + id);
										req.login(id, (err) => {
											if (err) { console.log(err) }
											//res.setHeader('Content-Type', 'text/html');
											//res.redirect('/');
											res.setHeader('Content-Type', 'application/json');
											res.send({error: false});
										});
									});
							});
					});
				}
			});
	});


	router.get('/comments', (req, res) => {
		Comment.find((err, comments) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true, data: comments });
		});
	});

	router.post('/comments', (req, res) => {
		const comment = new Comment();
		// body parser lets us use the req.body
		const { body } = req.body;
		console.log(req.body);
		if (!body) {
			// we should throw an error. we can do this check on the front end
			return res.json({
				success: false,
				error: 'You must provide a body.'
			});
		}
		comment.body = body;
		comment.save(err => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true });
		});
	});

	router.put('/comments/:commentId', (req, res) => {
		console.log(req.params);
		const { commentId } = req.params;
		if (!commentId) {
			return res.json({ success: false, error: 'No comment id provided' });
		}
		Comment.findById(commentId, (error, comment) => {
			if (error) return res.json({ success: false, error });
			const { body } = req.body;
			if (body) comment.body = body;
			comment.save(error => {
				if (error) return res.json({ success: false, error });
				return res.json({ success: true });
			});
		});
	});

	router.delete('/comments/:commentId', (req, res) => {
		const { commentId } = req.params;
		if (!commentId) {
			return res.json({ success: false, error: 'No comment id provided' });
		}
		Comment.remove({ _id: commentId }, (error, comment) => {
			if (error) return res.json({ success: false, error });
			return res.json({ success: true });
		});
	});


}
