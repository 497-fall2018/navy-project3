const User = require('./models/user');
const Post = require('./models/post');
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
	//make a new post
	app.post('/api/post/:username', (req, res) => {
		const { username } = req.params;
		const data = req.body;
		const post = new Post({ image: data.image, title: data.title, description: data.description, comments: []  });
		post.save().then(() => {
			res.send({ success: true, error: false });
		});
	});
	//add a comment to a post
	app.post('/api/post/:post_id/:username', (req, res) => {
		const { post_id, username } = req.params;
		const data = req.body;

		Post.findById(post_id, (error, post) => {
			if (error) return res.json({ success: false, error });
			post.comments.push({ text: data.text});
			post.save(error => {
				if (error) return res.json({ success: false, error: error });
				return res.json({ success: true });
			});
		});
	});
	//get list of all posts
	app.get('/api/post/', (req, res) => {
		Post.find((err, posts) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true, data: posts });
		});
	});


	//user access routes
	app.get('/signup', (req, res) => {
		
	});
	app.get('/login', (req, res) => {
		
	});
	app.get('/logout', (req, res) => {
		
	});
	app.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }), () => {

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
											res.setHeader('Content-Type', 'application/json');
											res.send({error: false});
									});
							});
					});
				};
			}
		);
	});
}