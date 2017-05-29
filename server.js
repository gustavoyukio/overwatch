// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// firebase
var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDoSNIZPh6vCKhO5U5YWMBmqMeyzCfBOXI",
    authDomain: "overwatch-17418.firebaseapp.com",
    databaseURL: "https://overwatch-17418.firebaseio.com",
    projectId: "overwatch-17418",
    storageBucket: "overwatch-17418.appspot.com",
    messagingSenderId: "413697016856"
};

firebase.initializeApp(config);
// login with Google Api
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');

// configuration =================

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get("/heroes", function(req, res) {
    console.dir(req);
    res.send(req.params);
});

// listen (start app with node server.js) ======================================
app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
})