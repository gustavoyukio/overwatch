'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp.services', ["ngRoute"]);

app.service("Mock", function() {

	var Mock = function () {

		var _self = this;

		_self.getGames = function () {

			var obj = [
				{
					type: "competitive",
					status: "win",
					map: "1",
					sr: "2000",
					heroes: {
						1: "17",
						2: "3"
					}
				},
				{}
			];

			return obj;

		}

	}

	return new Mock();
})

app.service("Heroes", function(){
	
	var Heroes = function () {
		
		var _self = this;

		_self.heroesList = [
			'Genji',
			'McCree',
			'Pharah',
			'Reaper',
			'Soldier76',
			'Sombra',
			'Tracer',
			'Bastion',
			'Hanzo',
			'Junkrat',
			'Mei',
			'Torbjorn',
			'Widowmaker',
			'DVa',
			'Orisa',
			'Reinhardt',
			'Roadhog',
			'Winston',
			'Zarya',
			'Ana',
			'Lucio',
			'Mercy',
			'Symmetra',
			'Zenyatta'
		];

		_self.getHeroes = function () {
			return _self.heroesList;
		}

	}

	return new Heroes();
})

app.service('Map', function(){

	var Map = function() {

		var _self = this;

		_self.Maps = [
			"Hanamura",
			"Temple of Anubis",
			"Volskaya Industries",
			"Dorado",
			"Route 66",
			"Watchpoint: Gibraltar",
			"Hollywood",
			"King's Row",
			"Numbani",
			"Eichenwalde",
			"Ilios",
			"Lijiang Tower",
			"Nepal",
			"Oasis"
		];

		_self.getMaps = function () {
			return _self.Maps;
		}

	}

	return new Map();
})

app.service('Score', ['Firebase', function(Firebase){
	
	var Score = function () {

		var _self = this;
		
		_self.getScore = function () {
			return "1000";
		}

		_self.getScores = function (callback) {
			Firebase.getScores(callback);
		}

		_self.setScoreInicial = function (val, callback) {
			Firebase.setScoreInicial(val, callback);
		}
		_self.getScoreInicial = function (callback) {
			Firebase.getScoreInicial(callback);
		}

	}

	return new Score();
}])

app.service('Game', ['Firebase', function(Firebase){
	
	var Game = function () {

		var _self = this;

		_self.obj = {
			'map':'',
			'score': '',
			'hour': '',
			'heroes':[]
		}

		_self.setMap = function (item) {
			_self.obj.map = item;
		}
		_self.setHeroes = function (item) {
			_self.obj.heroes.push(item);
		}
		_self.setScore = function (item) {
			_self.obj.score = item;
		}
		_self.setHour = function (item) {
			_self.obj.hour = item;
		}
		_self.saveEntry = function (callback) {
			//save obj
			Firebase.saveNewGameEntry(_self.obj, callback);
		}
	}

	return new Game();
}])

app.service('User', function () {

	var User = function () {

		var _self = this;

		_self.loggedIn = false;
		_self.data = {};

		_self.getLoggedStatus = function () {
			return _self.loggedIn;
		}

		_self.setLoggedStatus = function (dados, callback) {

			//console.dir(dados);

			_self.data.name  = dados.displayName;
			_self.data.email = dados.email;
			_self.data.uid   = dados.uid;

			this.loggedIn = true;

			callback(this.loggedIn);

		}

		_self.getUid = function () {
			return _self.data.uid;
		}
		
	}

	return new User();
})

app.service('Firebase', function(){
	return new Firebase();
})

app.service('Home', ['Firebase', function(Firebase) {
	var Home = function () {

		var _self = this;

		_self.heroesNeverDie = function (callback) {
			Firebase.heroesNeverDie(callback);
		}

		_self.mapsNeverDie = function (callback) {
			Firebase.mapsNeverDie(callback);
		}
	}
	return new Home();
}])

