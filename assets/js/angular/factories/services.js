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

		_self.getName = function () {
			return _self.data.name;
		}
		
	}

	return new User();
})

app.service('Firebase', function($rootScope, Statistics){
	return new Firebase($rootScope, Statistics);
})

app.service('Statistics', function ($rootScope) {

	var Statistics = function () {

		var _self = this;

		_self.data = {};

		_self.mapas = function () {

			var listaDeMapas = {};

			var estatisticaDoMapa = function (game, callback) {

				var _obj = this;

				this.win = 0;
				this.draw = 0;
				this.loss = 0;
				this.total = 0;
				this.winPercentage = 0;
				this.lossPercentage = 0;
				this.map = game.map;

				this.add = function (game) {

					if (game.label == 'win') _obj.win++;
					if (game.label == 'loss') _obj.loss++;
					if (game.label == 'draw') _obj.draw++;

					_obj.total++;
					_obj.winPercentage = (_obj.win / _obj.total) * 100;
					_obj.lossPercentage = (_obj.loss / _obj.total) * 100;

				}

				this.add(game);

			}
			this.getData = function () {
				return Object.values(listaDeMapas);
			}
			this.process = function (game, callback, counter) {

				if (counter == 0) {
					listaDeMapas[game.map] = new estatisticaDoMapa(game, callback);
				} else {
					if (listaDeMapas[game.map] == null) {
						listaDeMapas[game.map] = new estatisticaDoMapa(game, callback);
					} else {
						listaDeMapas[game.map].add(game, callback);
					}
				}
			}
		}

		_self.herois = function () {

			var listaDeHerois = {};

			var estatisticaDoHeroi = function (game, hero) {

				var _obj = this;

				this.win = 0;
				this.draw = 0;
				this.loss = 0;
				this.total = 0;
				this.winPercentage = 0;
				this.lossPercentage = 0;
				this.hero = hero;

				this.add = function (game) {

					if (game.label == 'win') _obj.win++;
					if (game.label == 'loss') _obj.loss++;
					if (game.label == 'draw') _obj.draw++;

					_obj.total++;
					_obj.winPercentage = (_obj.win / _obj.total) * 100;
					_obj.lossPercentage = (_obj.loss / _obj.total) * 100;

				}

				this.add(game);

			}

			this.getData = function () {
				return Object.values(listaDeHerois);
			}

			this.process = function (game,callback) {

				for (var i = 0; i < game.heroes.length; i++) {

					if (listaDeHerois[game.heroes[i]] == null) {
						listaDeHerois[game.heroes[i]] = new estatisticaDoHeroi(game,game.heroes[i])
					} else {
						listaDeHerois[game.heroes[i]].add(game);
					}

				}
			}
		}

		_self.heroisPorMapa = function () {
			var listaDeHeroisPorMapas = {};

			var estatisticaDoHeroiPorMapa = function (game, map, hero) {

				var _obj = this;

				this.win = 0;
				this.draw = 0;
				this.loss = 0;
				this.total = 0;
				this.winPercentage = 0;
				this.lossPercentage = 0;
				this.hero = hero;
				this,map = map;

				this.add = function (game) {

					if (game.label == 'win') _obj.win++;
					if (game.label == 'loss') _obj.loss++;
					if (game.label == 'draw') _obj.draw++;

					_obj.total++;
					_obj.winPercentage = (_obj.win / _obj.total) * 100;
					_obj.lossPercentage = (_obj.loss / _obj.total) * 100;

				}

				this.add(game);

			}
			
			this.getData = function () {
				return listaDeHeroisPorMapas;
			}
			this.process = function (game, callback) {

				if (listaDeHeroisPorMapas[game.map] == null) {
					listaDeHeroisPorMapas[game.map] = {};
				}

				for (var i = 0; i < game.heroes.length; i++) {
					if (listaDeHeroisPorMapas[game.map][game.heroes[i]] == null) {
						listaDeHeroisPorMapas[game.map][game.heroes[i]] = new estatisticaDoHeroiPorMapa(game, game.map, game.heroes[i])
					} else {
						listaDeHeroisPorMapas[game.map][game.heroes[i]].add(game, callback);
					}
				}
			}			
		}

		_self.mapasPorHeroi = function () {
			var listaDeMapasPorHeroi = {};

			var estatisticaDeMapaPorHeroi = function (game, map, hero) {

				var _obj = this;

				this.win = 0;
				this.draw = 0;
				this.loss = 0;
				this.total = 0;
				this.winPercentage = 0;
				this.lossPercentage = 0;
				this.hero = hero;
				this.map = map;

				this.add = function () {

					if (game.label == 'win') _obj.win++;
					if (game.label == 'loss') _obj.loss++;
					if (game.label == 'draw') _obj.draw++;

					_obj.total++;
					_obj.winPercentage = (_obj.win / _obj.total) * 100;
					_obj.lossPercentage = (_obj.loss / _obj.total) * 100;
				}

				this.add(game);

			}

			this.getData = function () {
				return listaDeMapasPorHeroi;
			}				

			this.process = function (game, callback) {

				for (var i = 0; i < game.heroes.length; i++) {

					if (listaDeMapasPorHeroi[game.heroes[i]] == null) {
						listaDeMapasPorHeroi[game.heroes[i]] = {}
					}

					if (listaDeMapasPorHeroi[game.heroes[i]][game.map] == null) {
						listaDeMapasPorHeroi[game.heroes[i]][game.map] = new estatisticaDeMapaPorHeroi(game, game.map, game.heroes[i])
					} else {
						listaDeMapasPorHeroi[game.heroes[i]][game.map].add(game,callback);
					}

				}

			}			
		}

		_self.tipos = function () {
			var tipos = {};

			var estatisticaDoHeroi = function (game,tipo) {

				var _obj = this;

				this.win = 0;
				this.draw = 0;
				this.loss = 0;
				this.total = 0;
				this.winPercentage = 0;
				this.lossPercentage = 0;
				this.tipo = tipo;

				this.add = function (game) {

					if (game.label == 'win') _obj.win++;
					if (game.label == 'loss') _obj.loss++;
					if (game.label == 'draw') _obj.draw++;

					_obj.total++;
					_obj.winPercentage = (_obj.win / _obj.total) * 100;
					_obj.lossPercentage = (_obj.loss / _obj.total) * 100;

				}

				this.add(game);

			}

			this.getData = function () {
				//console.dir(tipos);
				return Object.values(tipos);
			}

			this.process = function (game,callback) {

				for (var i = 0; i < game.types.length; i++) {

					if (tipos[game.types[i]] == null) {
						tipos[game.types[i]] = new estatisticaDoHeroi(game,game.types[i])
					} else {
						tipos[game.types[i]].add(game,callback);
					}

				}
			}			
		}

		_self.scores = function () {

			var listaScores = {};
			var _self = this;

			var resultados = function (game) {

				this.scores = [];

				this.add = function (game) {
					this.scores.push(game.score);
				}

				this.add(game);
			}

			this.getData = function () {
				//console.log(listaScores);
				var results = Object.values(listaScores);
				var scoresFull = results[0].scores;
				return scoresFull;
			}

			this.process = function (game, callback, counter) {
				if (counter == 0) {
					listaScores['scores'] = new resultados(game);
				} else {
					if (listaScores['scores'] == null) {
						listaScores['scores'] = new resultados(game);
					} else {
						listaScores['scores'].add(game);
					}	
				}
			}			
		}

		_self.sr = function () {
			var sr = {};

			var estatisticaDoSr = function (game, label) {

				var _obj = this;

				this.win = 0;
				this.draw = 0;
				this.loss = 0;
				this.total = 0;
				this.winPercentage = 0;
				this.lossPercentage = 0;
				this.label = label;

				this.add = function (game) {

					if (game.label == 'win') _obj.win++;
					if (game.label == 'loss') _obj.loss++;
					if (game.label == 'draw') _obj.draw++;

					_obj.total++;
					_obj.winPercentage = (_obj.win / _obj.total) * 100;
					_obj.lossPercentage = (_obj.loss / _obj.total) * 100;

				}

				this.add(game);

			}

			this.getData = function () {
				return sr;
			}

			this.process = function (game,callback) {


				if (game.srs.enemy > game.srs.team) {					
					if (sr['Menor'] == null) {
						sr['Menor'] = new estatisticaDoSr(game,'Menor')
					} else {
						sr['Menor'].add(game);
					}
				} else if (game.srs.enemy < game.srs.team) {
					if (sr['Maior'] == null) {
						sr['Maior'] = new estatisticaDoSr(game,'Maior')
					} else {
						sr['Maior'].add(game);
					}
				} else {
					if (sr['Igual'] == null) {
						sr['Igual'] = new estatisticaDoSr(game,'Igual')
					} else {
						sr['Igual'].add(game);
					}
				}
			}			
		}

		_self.sizes = function () {
			var sizes = {};

			var estatisticaDeSizes = function (game, label) {

				var _obj = this;

				this.win = 0;
				this.draw = 0;
				this.loss = 0;
				this.total = 0;
				this.winPercentage = 0;
				this.lossPercentage = 0;
				this.label = label;

				this.add = function (game) {

					if (game.label == 'win') _obj.win++;
					if (game.label == 'loss') _obj.loss++;
					if (game.label == 'draw') _obj.draw++;

					_obj.total++;
					_obj.winPercentage = (_obj.win / _obj.total) * 100;
					_obj.lossPercentage = (_obj.loss / _obj.total) * 100;

				}

				this.add(game);

			}

			this.getData = function () {
				return sizes;
			}

			this.process = function (game,callback) {

				if (sizes[game.party] == null) {
					sizes[game.party] = new estatisticaDeSizes(game)
				} else {
					sizes[game.party].add(game);
				}

			}			
		}

		_self.sides = function () {
			var sides = {};

			var estatisticaDeSides = function (game, label) {

				var _obj = this;

				_obj.win = 0;
				_obj.draw = 0;
				_obj.loss = 0;
				_obj.total = 0;
				_obj.winPercentage = 0;
				_obj.lossPercentage = 0;
				_obj.side = label;

				this.add = function (game) {

					if (game.label == 'win') _obj.win++;
					if (game.label == 'loss') _obj.loss++;
					if (game.label == 'draw') _obj.draw++;

					_obj.total++;
					_obj.winPercentage = (_obj.win / _obj.total) * 100;
					_obj.lossPercentage = (_obj.loss / _obj.total) * 100;

				}

				this.add(game);

			}

			this.getData = function () {
				return sides;
			}

			this.process = function (game,callback) {

				if (sides[game.side] == null) {
					sides[game.side] = new estatisticaDeSides(game, game.side)
				} else {
					sides[game.side].add(game, game.side);
				}

			}			
		}		

		// Instancias dos Objetos
		_self.mapas 		= new _self.mapas();
		_self.herois 		= new _self.herois();
		_self.heroisPorMapa = new _self.heroisPorMapa();
		_self.mapasPorHeroi = new _self.mapasPorHeroi();
		_self.tipos			= new _self.tipos();
		_self.scores 		= new _self.scores();
		_self.sr 			= new _self.sr();
		_self.sizes 		= new _self.sizes();
		_self.sides 		= new _self.sides();

		// Start Calling
		_self.start = function (dados) {

			for (var i = 0; i < dados.length; i++) {
				_self.addLastItem(dados[i])
			}

		}

		_self.addLastItem = function (item) {
			_self.sr.process(item)
			_self.mapas.process(item)
			_self.tipos.process(item)
			_self.sizes.process(item)
			_self.sides.process(item)
			_self.herois.process(item)
			_self.scores.process(item)
			_self.mapasPorHeroi.process(item)
			_self.heroisPorMapa.process(item)
		}

	}

	return new Statistics();

})

app.service('Home', function(Firebase,Statistics) {

	var Home = function () {

		var _self = this;

		Firebase.getGamesList(Statistics.start);

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
			Firebase.getGamesList(Statistics.start);
		}

	}

	return new Home();

})
;