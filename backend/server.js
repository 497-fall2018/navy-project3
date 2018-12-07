const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');

//Authentication Packages
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoDBStore = require('connect-mongodb-session')(session);

mongoose.Promise = global.Promise;

//connect to database
mongoose.connect('mongodb://mmoderwell.com:27018/buyornah').then(() => console.log('Connected to buyornah database.'))
	.catch((e) => {
		console.error('Connection to mongodb failed.');
	});
// mongoose.connect('mongodb://localhost:27017/buyornah').then(() => console.log('Connected to buyornah database.'))
// 	.catch((e) => {
// 		console.error('Connection to mongodb failed.');
// 	});

//the database connection is disconnected
mongoose.connection.on('disconnected', function () {
	console.log('Connection to mongodb is disconnected.');
});

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(bodyParser.json());

//session store setup -not sure if needed for mobile app
app.use(session({
	secret: 'blueberries',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
	},
	store: new MongoDBStore({
		uri: 'mongodb://mmoderwell.com:27018/buyornah',
		collection: 'sessions'
	}),
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated();
	next();
});

//passport local strategy, handles username and password
// passport.use(new LocalStrategy(
// 	(username, password, done) => {
// 		const User = require('./models/user');
// 		const bcrypt = require('bcrypt');
// 		User.findOne({ username: username }, function(err, user) {
// 			if (err) return done(err);
// 			if (!user) return done(null, false);
// 			let hashed = user.password;
// 			bcrypt.compare(password, hashed, (err, response) => {
// 				if (response === true) {
// 					return done(null, user);
// 				} else {
// 					return done(null, false);
// 				}
// 			});
// 		});
// 	}));

routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.get('*', function (req, res, next) {
	//let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
	let err = new Error('Page not found.');
	err.statusCode = 404;
	err.shouldRedirect = true; //New property on err so that our middleware will redirect
	next(err);
});

app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'DEVELOPMENT' ? err : {};

	// render the error page
	res.status(err.status || 500);
	//res.render('error.ejs', { err, });
});

module.exports = app;

app.listen(3001, () => {
	console.log('Listening on port 3001');
});
