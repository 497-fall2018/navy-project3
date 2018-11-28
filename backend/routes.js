const User = require('./models/user');
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

}