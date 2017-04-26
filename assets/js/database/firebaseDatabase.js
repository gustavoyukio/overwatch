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
		console.log(path);
		console.dir(valor);

		obj = {};
		obj[_self.gameStatusLabel] = valor;

		firebase.database().ref(path).update(obj);

	}

	_self.saveHeroCounterStart = function () {

	}

	_self.getHeroCounter = function (item, callback, contador = 0) {

		var uid = _self.getUserUid();
		
		console.log("=== Get Hero Counter ===");
		console.dir(item);

		var counter = 10 || contador;

		console.log("=== Counter ===");
		console.dir(counter);

		var heroes = '';
		var valor = 0;

		if (counter >= item.heroes.length) {

		}

		for (var i=0; i < item.heroes.length; i++) {
			
			var heroes = '';
			var valor = 0;
			
			heroes = item.heroes[i];
			console.log(heroes);
			
			var path = "/" + uid + "/heroes/" + heroes + "/" + _self.gameStatusLabel;
			console.log(path);
			
			firebase
				.database()
				.ref(path)
				.once("value", function(snapshot){
				
					if (snapshot.val() != null) {
						valor = parseInt(snapshot.val())+1;
						console.log("======");
						console.log(valor);
					}

					_self.saveNewHeroCounter(heroes, valor);
				});
			
			
		}

	}

	// Map Counter
	_self.saveMapCounter = function (map, value) {
		var obj = null;
		delete obj;

		obj = {};
		obj[map] = value;

		firebase
			.database()
			.ref('/maps')
			.update(obj);
	}
	_self.getMapCounter = function (map, callback) {

		firebase
			.database()
			.ref('maps/'+map)
			.once("value", function(snapshot){
				
				var valor = 1;
				if (snapshot.val() != null) {
					valor = parseInt(snapshot.val())+1;
				}

				callback(map,valor);
			});
	}

	// Hour Counter
	_self.saveHourCounter = function (hour, value) {
		var obj = null;
		delete obj;

		obj = {};
		obj[hour] = value;

		firebase
			.database()
			.ref('/hours')
			.update(obj);
	}
	_self.getHourCounter = function (hour, callback) {

		firebase
			.database()
			.ref('hours/'+hour)
			.once("value", function(snapshot){
				
				var valor = 1;
				if (snapshot.val() != null) {
					valor = parseInt(snapshot.val())+1;
				}

				callback(hour,valor);
			});
	}

	// Save Game Entry
	_self.saveEntry = function (obj, callback) {

		firebase
			.database()
			.ref('games')
			.push(obj);

		var msg = "Jogo Adicionado com Sucesso";

		callback(msg);
	}

	// Primeiro Acesso de Gravacao de Jogo
	_self.saveNewGameEntry = function (item, callback) {

		// 1 Save Score - OK
		_self.getScoreCounter(item, _self.saveScoreCounter);
		// 2 Save Heroes - 
		// _self.getHeroCounter(item,_self.saveNewHeroCounter);
		// 3 Save Maps
		// _self.getMapCounter(item.map, _self.saveMapCounter);
		// 4 Save Hours
		// _self.getHourCounter(item.hour, _self.saveHourCounter)
		// 5 Save Game Details
		// _self.saveEntry(item, callback);
		// 6 Callback
		

		// save heroes counter
		/*
		for (var i=0; i < item.heroes.length; i++) {
			var heroes = '';
			heroes = item.heroes[i];
			_self.getHeroCounter(heroes,_self.saveNewHeroCounter);
		}
		*/
	}	

	// Get Scores
	_self.getScoreCounter = function (item, callback) {

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
				
				callback(contadorDeScorePartidas,item);

			});
	}
	_self.saveScoreCounter = function (counter,item) {

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
					_self.getHeroCounter(item, _self.saveNewHeroCounter)
				}
			});
	}
	_self.getScores = function (callback) {
		
		firebase
			.database()
			.ref('score/')
			.once("value", function(snapshot){
				
				callback(snapshot.val());

			});
	}
	_self.setScoreInicial = function (val, callback) {
		var obj = null;
		delete obj;

		obj = {};
		obj[0] = val;

		firebase
			.database()
			.ref('/score')
			.update(obj);

		callback(val);		
	}
	_self.getScoreInicial = function (callback) {
		firebase
			.database()
			.ref('score/')
			.once("value", function(snapshot){
				
				callback(snapshot.val()[0]);

			});				
	}

	_self.heroesNeverDie = function (callback) {
		
		firebase
		.database()
		.ref('heroes')
		.orderByChild('heroes')
		.once("value", function(snapshot){
				
			callback(snapshot.val());

		});	
	}

}