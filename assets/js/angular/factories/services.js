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
			"Oasis"
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
			this.process = function (game, callback) {

				if (listaDeMapas[game.map] == null) {
					listaDeMapas[game.map] = new estatisticaDoMapa(game, callback)
				} else {
					listaDeMapas[game.map].add(game, callback);
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
				var results = Object.values(listaScores);
				$rootScope.listaDeScores = results[0].scores;
			}

			this.process = function (game, callback) {
				if (listaScores['scores'] == null) {
					listaScores['scores'] = new resultados(game);
				} else {
					listaScores['scores'].add(game);
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
				return sides;
			}

			this.process = function (game,callback) {

				if (sides[game.side] == null) {
					sides[game.side] = new estatisticaDeSides(game)
				} else {
					sides[game.side].add(game);
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
		_self.start = function (dados, callback) {
			
			for (_self.i=0; _self.i < dados.length; _self.i++) {
				_self.mapas.process(dados[_self.i], callback);
				_self.tipos.process(dados[_self.i], callback);
				_self.herois.process(dados[_self.i], callback);
				_self.heroisPorMapa.process(dados[_self.i], callback);
				_self.mapasPorHeroi.process(dados[_self.i], callback);
				_self.scores.process(dados[_self.i]);
				_self.sr.process(dados[_self.i]);
				_self.sizes.process(dados[_self.i]);
				_self.sides.process(dados[_self.i]);
			}

			_self.scores.getData();

		}

	}
	abacate =  new Statistics();
	return abacate;

})

app.service('Home', function(Firebase,Statistics) {

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
			Firebase.getGamesList(Statistics.start);
		}

	}

	return new Home();

})
;