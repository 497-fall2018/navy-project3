module.exports = (app) => {
	//just a route to check to see if things are working
	app.get('/api/', (req, res) => {
		res.send({ hello: "world" });
	});
}