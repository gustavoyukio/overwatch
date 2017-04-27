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
		//return firebase.auth().currentUser.uid;
		return 'qnQdKgKH0yN2KsIxWhQHkWi2zkx1';
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

	// Hero Counter
	_self.saveNewHeroCounter = function (hero, valor) {
		
		var obj = null;
		delete obj;

		var uid = _self.getUserUid();
		var path = "/" + uid + "/heroes/" + hero;

		obj = {};
		obj[_self.gameStatusLabel] = valor;

		firebase.database().ref(path).update(obj);
	}
	_self.getHeroCounter = function (item, callback, contador = 0) {

		var uid = _self.getUserUid();

		for (var i=0; i < item.heroes.length; i++) {
			
			var heroes = '';
			var valor = 0;
			
			heroes = item.heroes[i];		
			var path = "/" + uid + "/heroes/" + heroes + "/" + _self.gameStatusLabel;
			
			var objteste = function(heroes, uhuu) {
				
				var _self = this;
				_self.heroes = heroes;
				_self.uhuu = uhuu;

				_self.abacate = function (snapshot) {
				
					var valor = 1;
					if (snapshot.val() != null) {

						valor = parseInt(snapshot.val())+1;
					}

					_self.uhuu.saveNewHeroCounter(_self.heroes, valor, _self.startMapCounter);

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
		var obj = null;
		delete obj;

		var uid = _self.getUserUid();
		var path = "/" + uid + "/maps/" + map;

		obj = {};
		obj[_self.gameStatusLabel] = valor;

		firebase
			.database()
			.ref(path)
			.update(obj);
	}
	_self.getMapCounter = function (item) {

		var uid  = _self.getUserUid();
		var path = "/" + uid + "/maps/" + item.map + "/" + _self.gameStatusLabel;

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				var valor = 1;
				if (snapshot.val() != null) {
					valor = parseInt(snapshot.val())+1;
				}

				_self.saveMapCounter(item.map,valor);
			});
	}

	// Hour Counter
	_self.saveHourCounter = function (hour, valor) {
		var uid = _self.getUserUid();
		var path = "/" + uid + "/hour/" + hour;

		var obj = null;
		delete obj;

		obj = {};
		obj[_self.gameStatusLabel] = valor;

		firebase
			.database()
			.ref(path)
			.update(obj);
	}
	_self.getHourCounter = function (item) {

		var uid  = _self.getUserUid();
		var path = "/" + uid + "/hour/" + item.hour + "/" + _self.gameStatusLabel;

		firebase
			.database()
			.ref(path)
			.once("value", function(snapshot){
				
				var valor = 1;
				if (snapshot.val() != null) {
					valor = parseInt(snapshot.val())+1;
				}

				_self.saveHourCounter(item.hour,valor);
			});
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

		callback(msg);
	}

	// Primeiro Acesso de Gravacao de Jogo
	_self.saveNewGameEntry = function (item, callback) {
		// 1 Save Score - OK
		// Settando Game Status
		_self.getScoreCounter(item, _self.continueSaving, callback);
	}	
	_self.continueSaving = function (item, callback) {
		// Game Status Setted, agora salvar os dados
		_self.getHeroCounter(item, _self.saveNewHeroCounter);
		_self.getMapCounter (item);
		_self.getHourCounter(item);
		_self.saveEntry     (item, callback);
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

	_self.heroesNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = "/" + uid + "/heroes";

		firebase
		.database()
		.ref(path)
		.once("value", function(snapshot){
				
			callback(snapshot.val());

		});	
	}
	_self.mapsNeverDie = function (callback) {
		
		var uid = _self.getUserUid();
		var path = "/" + uid + "/maps";

		firebase
		.database()
		.ref(path)
		.once("value", function(snapshot){
				
			callback(snapshot.val());

		});	
	}

}