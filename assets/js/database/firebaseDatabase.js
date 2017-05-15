var Firebase = function() {
	
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
		return firebase.auth().currentUser.uid;
		//return 'qnQdKgKH0yN2KsIxWhQHkWi2zkx1';
	}

	// Game Status
	_self.gameStatus = function (value) {
		if (value == 0) {
			_self.gameStatusLabel = 'loss';
		} else if (value == 2){
			_self.gameStatusLabel = 'win';
		} else {
			_self.gameStatusLabel = 'draw';
		}
	}

	_self.dataSetup = function (arr) {

		if (arr == undefined) {
			arr = {};
		}

		if (arr['win'] == null) {
			arr['win'] = 0;
		}
		if (arr['loss'] == null) {
			arr['loss'] = 0;
		}
		if (arr['draw'] == null) {
			arr['draw'] = 0;
		}
		if (arr['total'] == null) {
			arr['total'] = 0;
		}
		if (arr['winPercentage'] == null) {
			arr['winPercentage'] = 0;
		}
		if (arr['lossPercentage'] == null) {
			arr['lossPercentage'] = 0;
		}
		// Adicionamos no status e no total
		arr[_self.gameStatusLabel] = arr[_self.gameStatusLabel] + 1;
		arr['total'] = arr['total'] + 1;

		// agora alteramos as porcentagens
		arr['lossPercentage'] = parseFloat(arr['loss'])/parseFloat(arr['total']);
		arr['winPercentage'] = parseFloat(arr['win'])/parseFloat(arr['total']);

		return arr;
	}

	// SR Setup
	_self.saveSRCounter = function (item, valor) {
		
		var uid  = _self.getUserUid();
		var path = "/" + uid + "/srs/" + item;
		var obj  = _self.dataSetup(valor);

		firebase.database().ref(path).update(obj);
	}
	_self.getSRCounter = function (item) {

		var status = "bigger";

		if (item.srs.team < item.srs.enemy) {
			status = "smaller";
		}

		if (item.srs.team == item.srs.enemy) {
			status = "equal";
		}

		var uid  = _self.getUserUid();
		var path = "/" + uid + "/srs/" + status;

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				if (snapshot.val() != null) {
					var valor = snapshot.val();
				}
				_self.saveSRCounter(status,valor);

			});
	}

	// Hero Counter
	_self.saveNewHeroCounter = function (hero, valor) {

		var uid  = _self.getUserUid();
		var path = "/" + uid + "/heroes/" + hero;
		var obj  = _self.dataSetup(valor);

		firebase.database().ref(path).update(obj);
	}
	_self.getHeroCounter = function (item, callback, contador = 0) {

		var uid = _self.getUserUid();

		for (var i=0; i < item.heroes.length; i++) {
			
			var heroes = '';
			
			heroes = item.heroes[i];		
			var path = "/" + uid + "/heroes/" + heroes;
			
			var objteste = function(heroes, uhuu) {
				
				var _self = this;
				_self.heroes = heroes;
				_self.uhuu = uhuu;

				_self.abacate = function (snapshot) {
				
					if (snapshot.val() != null) {

						var value = snapshot.val();

					}

					_self.uhuu.saveNewHeroCounter(_self.heroes, value, _self.startMapCounter);

				}

			};

			var a = new objteste(heroes, _self);

			firebase
				.database()
				.ref(path)
				.once("value", a.abacate);
			
			
		}
	}

	// Map Counter
	_self.saveMapCounter = function (map, valor) {
		
		var uid  = _self.getUserUid();
		var path = "/" + uid + "/maps/" + map;
		var obj  = _self.dataSetup(valor);

		firebase.database().ref(path).update(obj);
	}
	_self.getMapCounter = function (item) {

		var uid  = _self.getUserUid();
		var path = "/" + uid + "/maps/" + item.map;

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				if (snapshot.val() != null) {
					var valor = snapshot.val();
				}
				_self.saveMapCounter(item.map,valor);

			});
	}

	// Hour Counter
	_self.saveHourCounter = function (hour, valor) {
		
		var uid  = _self.getUserUid();
		var path = "/" + uid + "/hour/" + hour;
		var obj  = _self.dataSetup(valor);

		firebase.database().ref(path).update(obj);
	}
	_self.getHourCounter = function (item) {

		var uid  = _self.getUserUid();
		var path = "/" + uid + "/hour/" + item.hour;

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				if (snapshot.val() != null) {
					var valor = snapshot.val();
				}

				_self.saveHourCounter(item.hour,valor);

			});
	}

	// Type Counter
	_self.saveTypeCounter = function (type, valor) {
		
		var uid  = _self.getUserUid();
		var path = "/" + uid + "/types/" + type;
		var obj  = _self.dataSetup(valor);
		console.log(path);

		firebase.database().ref(path).update(obj);
	}
	_self.getTypeCounter = function (item) {

		var uid  = _self.getUserUid();
		console.dir(item);

		for (var i=0; i < item.types.length; i++) {
			
			var type = '';
			
			type = item.types[i];		
			var path = "/" + uid + "/type/" + type;
			
			var typeObj = function(type, firebaseValues) {
				
				var _self = this;
				_self.type = type;
				_self.firebaseValues = firebaseValues;

				_self.abacate = function (snapshot) {
				
					if (snapshot.val() != null) {

						var value = snapshot.val();

					}

					_self.firebaseValues.saveTypeCounter(_self.type, value, _self.startMapCounter);

				}

			};

			var newTypeObj = new typeObj(type, _self);

			firebase
				.database()
				.ref(path)
				.once("value", newTypeObj.abacate);
			
			
		}
	}

	// Save Game Entry
	_self.saveEntry = function (obj, callback) {

		var uid  = _self.getUserUid();
		var path = "/" + uid + "/games";

		firebase
			.database()
			.ref(path)
			.push(obj);

		var msg = "Jogo Adicionado com Sucesso";

		//callback(msg);
	}

	// Primeiro Acesso de Gravacao de Jogo
	_self.saveNewGameEntry = function (item, callback) {
		// 1 Save Score - OK
		// Settando Game Status
		_self.getScoreCounter(item, _self.continueSaving, callback);
		console.log("Salvando um Jogo")
	}	
	_self.continueSaving = function (item, callback) {
		// Game Status Setted, agora salvar os dados
		//_self.getHeroCounter(item, _self.saveNewHeroCounter);
		//_self.getMapCounter (item);
		//_self.getHourCounter(item);
		//_self.getTypeCounter(item);
		_self.getSRCounter(item);
		//_self.saveEntry     (item, callback);
	}

	// Get Scores
	_self.getScoreCounter = function (item, continueCallback, callback) {

		var uid = _self.getUserUid();
		var path = "/" + uid + "/scores";

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				var contadorDeScorePartidas = 0;
				var valor = 0;

				if (snapshot.val() != null ) {
					valor = snapshot.val();
					contadorDeScorePartidas = Object.keys(snapshot.val()).length;
					valor = valor[contadorDeScorePartidas-1];
				}

				if (item.score > valor) {
					_self.gameStatus(2);
				} else if (item.score == valor){
					_self.gameStatus(1);
				} else {
					_self.gameStatus(0);
				}
				
				_self.saveScoreCounter(contadorDeScorePartidas, item, continueCallback, callback);

			});
	}
	_self.saveScoreCounter = function (counter, item, continueCallback, callback) {

		var obj = null;
		delete obj;

		obj = {};
		obj[counter] = item.score;

		var uid = _self.getUserUid();
		var path = "/" + uid + "/scores";

		firebase
			.database()
			.ref(path)
			.update(obj, function(error) {
				if (error) {
					console.error(error);
				} else {
					// Chamar a funcao
					continueCallback(item, callback);
				}
			});
	}
	_self.getScores = function (callback) {
		
		var uid  = _self.getUserUid();
		var path = "/" + uid + "/scores"; 
		
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
		var path = "/" + uid + "/scores"; 

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
		var path = "/" + uid + "/scores"; 

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

	_self.sortByField = function (field,arr) {
		
		var array = arr;

		function dynamicSort(property) {
    		
    		return function (a,b) {
    			
    			//console.log('comparing => ' + a[property] + ' / ' + b[property]);

    			if (a[property] !== undefined  && b[property] !== undefined) {
    				if (a[property] < b[property]) {
    					return 1;
    				} else {
    					return -1;
    				}
    			} else if (a[property] !== undefined) {
    				return -11;
    			} else if (b[property] !== undefined) {
    				//console.log('A eh undefined');
    				return 1;
    			}
    			return 0;
        		
    		}
		}

		array = array.sort(dynamicSort(field));

		return array;

	}

	_self.heroesNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = "/" + uid + "/heroes";

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

			ret.push(_self.sortByField('total',obj));
			ret.push(_self.sortByField('winPercentage',obj));
			ret.push(_self.sortByField('lossPercentage',obj));

			callback(ret);

		});	
	}
	_self.mapsNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = "/" + uid + "/maps";

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

			ret.push(_self.sortByField('total',obj));
			ret.push(_self.sortByField('winPercentage',obj));
			ret.push(_self.sortByField('lossPercentage',obj));

			callback(ret);

		});	
	}
	_self.srsNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = "/" + uid + "/srs";

		firebase
		.database()
		.ref(path)
		.once("value", function(snapshot){
			
			console.dir(snapshot.val());
			var valor = snapshot.val();

			callback(valor);

		});	
	}

}