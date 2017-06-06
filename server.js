// server.js

// set up ========================
var express  		= require('express');
var app      		= express();                               // create our app w/ express
var bodyParser 		= require('body-parser');    // pull information from HTML POST (express4)
var methodOverride 	= require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================
app.set('port', (process.env.PORT || 5000))

// Config Express
app.use(express.static(__dirname));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Config User
//var User = new User();

// Rotas
app.post("/heroes/:id", function(req, res) {
	
	/*
    var path = "/qnQdKgKH0yN2KsIxWhQHkWi2zkx1/games";
    console.log(path);

    console.dir(admin);

    var a = admin
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				res.send(snapshot.val());

			}, function (error) {
				res.send (error);
			});
	*/

	res.send("OK");
});

// listen (start app with node server.js) ======================================
app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
})