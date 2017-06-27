var abacate = {};

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
			{
				'name' : 'Genji', 'type' : 'DPS' 
			},{
				'name' : 'McCree', 'type' : 'DPS' 
			},{
				'name' : 'Pharah', 'type' : 'DPS' 
			},{
				'name' : 'Reaper', 'type' : 'DPS' 
			},{
				'name' : 'Soldier76', 'type' : 'DPS' 
			},{
				'name' : 'Sombra', 'type' : 'DPS' 
			},{
				'name' : 'Tracer', 'type' : 'DPS' 
			},{
				'name' : 'Bastion', 'type' : 'Defense' 
			},{
				'name' : 'Hanzo', 'type' : 'Defense' 
			},{
				'name' : 'Junkrat', 'type' : 'Defense' 
			},{
				'name' : 'Mei', 'type' : 'Defense' 
			},{
				'name' : 'Torbjorn', 'type' : 'Defense' 
			},{
				'name' : 'Widowmaker', 'type' : 'Defense' 
			},{
				'name' : 'DVa', 'type' : 'Tank' 
			},{
				'name' : 'Orisa', 'type' : 'Tank' 
			},{
				'name' : 'Reinhardt', 'type' : 'Tank' 
			},{
				'name' : 'Roadhog', 'type' : 'Tank' 
			},{
				'name' : 'Winston', 'type' : 'Tank' 
			},{
				'name' : 'Zarya', 'type' : 'Tank' 
			},{
				'name' : 'Ana', 'type' : 'Support' 
			},{
				'name' : 'Lucio', 'type' : 'Support' 
			},{
				'name' : 'Mercy', 'type' : 'Support' 
			},{
				'name' : 'Symmetra', 'type' : 'Support' 
			},{
				'name' : 'Zenyatta', 'type' : 'Support' 
			}
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
			"Oasis",
			"Horizon Lunar"
		];

		_self.getMaps = function () {

			var uva = _self.Maps.sort(function(a, b){
 				
 				if (a < b) //sort string ascending
  					return -1;
 				if (a > b)
  					return 1;
 				return 0; //default return value (no sorting)
			});

			return uva;
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
		_self.getHeroesInicial = function (callback) {
			Firebase.getHeroesInicial(callback);
		}

	}

	return new Score();
}])

app.service('Game', ['Firebase','$cookies', function(Firebase,$cookies){
	
	var Game = function () {

		var _self = this;

		_self.obj = {
			'map'   : '',
			'score' : '',
			'hour'  : '',
			'heroes': [],
			'types' : [],
			'party' : '',
			'side'  : '',
			'srs'   : {
				'team': 0,
				'enemy': 0
			}
		}

		_self.setMap = function (item) {
			_self.obj.map = item;
		}
		_self.setSide = function (item) {
			_self.obj.side = item;
		}		
		_self.setHeroes = function (item) {
			var hero = JSON.parse(item);
			_self.obj.heroes.push(hero.name);
			_self.obj.types.push(hero.type);
		}
		_self.setTypes = function (item) {

		}
		_self.setScore = function (item) {
			_self.obj.score = item;
		}
		_self.setHour = function (item) {
			_self.obj.hour = item;
		}
		_self.setSRs = function (team, enemy) {
			var time    = _self.obj.srs.team = team;
			var inimigo = _self.obj.srs.enemy = enemy;
		}
		_self.setPartySize =  function (value) {
			_self.obj.party = value;
			$cookies.put('party',value);
		}
		_self.saveEntry = function (callback) {
			Firebase.saveNewGameEntry(_self.obj, callback);
		}
		_self.resetGameObject = function () {
			_self.obj.heroes = [];
			_self.obj.types  = [];
			_self.obj.srs.team = 0;
			_self.obj.srs.enemy = 0;
		}
		_self.getGamesList = function (callback) {
			Firebase.getGamesList(callback);
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

app.service('Firebase', function($rootScope){
	return new Firebase($rootScope);
})

app.service('GameList', function () {

	var GameList = function () {

        var _self = this;
        _self.games = '';

        _self.start = function (data) {
        	_self.games = data;
        }

    }

    return new GameList();

})

app.service('Statistics', function (GameList) {

	var Statistics = function () {

		var _self = this;

		_self.newArray = function () {
			var obj = [];
			obj.length = 0;
			return obj;
		}

		_self.setupData = function (data) {
			var _obj = {};

			_obj.total++;

			if (data.label == 'win') {

			}
		}

		_self.getScores = function (callback) {
			var obj = _self.newArray();

			for (var i = 0; i < GameList.games.length; i++) {
				obj.push(GameList.games[i].score)
			}

			callback(obj);

		}

		_self.getMapas = function (callback) {
			var obj = _self.newArray();

			for (var i = 0; i < GameList.games.length; i++) {
				console.log(GameList.games[i]);
				//obj.push(GameList.games[i].score)
				//obj[GameList.games[i].map]
				
			}

			callback(obj);

		}

		_self.getHerois = function (callback) {
			var obj = _self.newArray();

			for (var i = 0; i < GameList.games.length; i++) {
				obj.push(GameList.games[i].score)
			}

			callback(obj);

		}

	}

	return new Statistics();

})

app.service('Home', function(Firebase,GameList) {

	var Home = function () {

		var _self = this;

		_self.heroesNeverDie = function (callback) {
			Firebase.heroesNeverDie(callback);
		}

		_self.mapsNeverDie = function (callback) {
			Firebase.mapsNeverDie(callback);
		}

		_self.srsNeverDie = function (callback) {
			Firebase.srsNeverDie(callback);
		}

		_self.sizesNeverDie = function (callback) {
			Firebase.sizesNeverDie(callback);
		}

		_self.typesNeverDie = function (callback) {
			Firebase.typesNeverDie(callback);
		}

		_self.setNewSeason = function () {
			Firebase.setNewSeason();
		}

		_self.getStatistics = function () {
			Firebase.getGamesList(GameList.start);
		}

	}

	return new Home();

})
;