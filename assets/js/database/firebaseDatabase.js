var Firebase = function($rootScope, Statistics) {
	
	var _self	 			= this;
	this.config  			= null;
	this.hasInit 			= false;
	this.initCallbacks 		= [];
	_self.gameStatusLabel   = 'loss';
	
	this.addInitCallback = function(callback){
		if(_self.hasInit) callback();
		else _self.initCallbacks.push(callback);
	}
	
	this.fireInitCallbacks = function(){
		_self.hasInit = true;
		_self.initCallbacks.forEach(function(arg){
			try{
				arg()
			}catch(err){
				console.log("Erro no callback "+arg);
			}
		});
	}

	this.fireCallbacks=function(){
		for(var j=0;j< _self.updateCallback.length;j++){
			try{
				_self.updateCallback[j]();
			}catch(err){
				console.log("Error in callback "+_self.updateCallback[j]);
			}
		}
	}

	// User
	_self.getUserUid = function () {
		if (!$rootScope.test) {
			var user = firebase.auth().currentUser.uid;	
		} else {
			var user = 'TaN3G9CWUGZan2ex0WNKy4DOIuB3'; // GYCC3
		}
		
		return user;
	}

	_self.getCurrentPath = function () {
		return = "/season6/";
	}


	// Save Game Entry
	_self.saveEntry = function (obj, callback) {

		var uid  = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/games";

		firebase
			.database()
			.ref(path)
			.push(obj);

		var msg = "Jogo Adicionado com Sucesso";

		callback(msg);
	}
	_self.getGamesList = function (callback) {

		var uid  = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/games";

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				// tratar dados
				var array = $.map(snapshot.val(), function(value, index) {
    				return [value];
				});
				//console.log(array);
				callback(array);

			}, function (error) {
				console.dir(error);
			})
	}

	// Primeiro Acesso de Gravacao de Jogo
	_self.saveNewGameEntry = function (item, callback) {
		_self.getScoreToStart(item, callback);
	}

	_self.getScoreToStart = function (item, callback) {

		var uid = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/scores";

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){

				var scoreInicial = snapshot.val();
				_self.getScoreCounter(scoreInicial, item, callback);

			});
	}


	// Get Scores
	_self.getScoreCounter = function (start, item, callback) {

		var uid = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/games";

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				var valor = 0;

				if (snapshot.val() != null ) {
					
					val = snapshot.val();
					contadorDeScorePartidas = Object.keys(snapshot.val()).length;

					if (contadorDeScorePartidas == 0) {
						valor = start;
					} else {
						valor = val[Object.keys(snapshot.val())[contadorDeScorePartidas-1]].score;
					}
					
				}

				if (item.score > valor) {
					item.label = 'win';
				} else if (item.score == valor){
					item.label = 'draw';
				} else {
					item.label = 'loss';
				}
				
				Statistics.addLastItem(item);
				_self.saveEntry(item, callback);

			});
	}

	_self.getScores = function (callback) {
		
		var uid  = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/scores"; 
		
		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				callback(snapshot.val());

			});
	}

	// Apenas para settar o score inicial
	_self.setScoreInicial = function (val, callback) {
		
		var obj = null;
		delete obj;

		var uid  = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/scores"; 

		obj = {};
		obj[0] = val;

		firebase
			.database()
			.ref(path)
			.update(obj);

		_self.getScoreInicial(callback);
	}
	
	_self.getScoreInicial = function (callback) {
		var uid  = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/scores"; 

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				var value = false;
				if (snapshot.val() != null) {
					value = snapshot.val()[0];
				}
				callback(value);

			});				
	}
	_self.getHeroesInicial = function (callback) {
		var uid  = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/types"; 

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				var value = null;
				if (snapshot.val() != null) {
					value = snapshot.val();
				}
				callback(value);

			});			
	}

	// Home Callbacks
	_self.heroesNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/heroes";

		firebase
		.database()
		.ref(path)
		.once("value", function(snapshot){

			var obj = [];
			var ret = [];
			var result = snapshot.val() || {};

			for (var i=0; i < Object.keys(result).length; i++) {
				obj[i]      = result[Object.keys(result)[i]];
				obj[i].name = Object.keys(result)[i];
			}

			callback(obj);

		});	
	}
	_self.mapsNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/maps";

		firebase
		.database()
		.ref(path)
		.once("value", function(snapshot){
				
			var obj = [];
			var ret = [];
			var result = snapshot.val() || {};

			for (var i=0; i < Object.keys(result).length; i++) {
				obj[i]      = result[Object.keys(result)[i]];
				obj[i].name = Object.keys(result)[i];
			}

			callback(obj);

		});	
	}
	_self.srsNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/srs";

		firebase
		.database()
		.ref(path)
		.once("value", function(snapshot){
			
			var valor = snapshot.val();

			callback(valor);

		});	
	}
	_self.sizesNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/sizes";
		var sizes = {
			1: {
				total: '',
				win: ''
			},
			2: {
				total: '',
				win: ''
			},
			3: {
				total: '',
				win: ''
			},
			4: {
				total: '',
				win: ''
			},
			5: {
				total: '',
				win: ''
			},
			6: {
				total: '',
				win: ''
			}
		};		

		var partySizer = function (index,result) {
			var valor = '';
			var win = '';

			if (result == undefined) {
				valor = '0';
				win = '0';
			} else {
				valor = result.total;
				win = result.winPercentage
			}

			sizes[index].total = valor;
			sizes[index].win = win;
		}

		firebase
		.database()
		.ref(path)
		.once("value", function(snapshot){

			var valor = snapshot.val();

			for (var i=0; i < 6; i++) {
				if (valor != null) {
					partySizer(i+1,valor[i+1]);
				} else {
					partySizer(i+1,0);	
				}
				
			}
			callback(sizes);

		});
	}
	_self.typesNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = _self.getCurrentPath + uid + "/types";

		firebase
		.database()
		.ref(path)
		.once("value", function(snapshot){

			var valor = snapshot.val();

			for (var i in valor) {
				valor[i].name = i;
			}

			callback(valor);

		});		
	}

	_self.setNewSeason = function () {

		var path = _self.getCurrentPath 
		//console.log("OI");

		firebase
		.database()
		.ref(path)
		.once("value", function(snapshot){

			var pathInterno = "/season6/";
			//console.log(pathInterno);

			obj = snapshot.val();

			firebase
				.database()
				.ref(pathInterno)
				.update(obj);			

		}, function (Error) {
			console.log(Error);
		});
	}

}