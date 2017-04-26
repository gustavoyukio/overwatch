var Firebase = function() {
	
	var _self	 		= this;
	this.config  		= null;
	this.hasInit 		= false;
	this.initCallbacks 	= [];
	_self.vitoria 		= false;
	
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

	// Hero Counter
	_self.saveNewHeroCounter = function (hero, valor) {
		
		var obj = null;
		delete obj;

		var uid = _self.getUserUid();
		var path = "/" + uid + "/heroes";

		obj = {};
		obj[hero] = valor;

		firebase
			.database()
			.ref(path)
			.update(obj);
	}
	_self.getHeroCounter = function (hero, callback) {

		var uid = _self.getUserUid();
		var path = "/" + uid + "/heroes";

		firebase
			.database()
			.ref(path+'/'+hero)
			.once("value", function(snapshot){
				
				console.dir(snapshot.val());
				var valor = 1;
				if (snapshot.val() != null) {
					valor = parseInt(snapshot.val())+1;
				}

				callback(hero,valor);
			});
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

		// console.dir(item);
		// Definir Derrota ou Vitoria
		_self.getScoreCounter(item.score, _self.saveScoreCounter);

		// save heroes counter
		/*
		for (var i=0; i < item.heroes.length; i++) {
			var heroes = '';
			heroes = item.heroes[i];
			_self.getHeroCounter(heroes,_self.saveNewHeroCounter);
		}

		_self.getMapCounter(item.map, _self.saveMapCounter);
		_self.getHourCounter(item.hour, _self.saveHourCounter)
		
		
		_self.saveEntry(item, callback);
		*/

	}	

	// Get Scores
	_self.getScoreCounter = function (score, callback) {

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
				}

				if (score > valor) {
					_self.vitoria = true;
				}
				
				callback(contadorDeScorePartidas,score);

			});
	}
	_self.saveScoreCounter = function (counter,score) {

		var obj = null;
		delete obj;

		obj = {};
		obj[counter] = score;

		var uid = _self.getUserUid();
		var path = "/" + uid + "/scores";

		firebase
			.database()
			.ref(path)
			.update(obj);
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

	// --- User --- //
	_self.verifyUser = function (login,senha) {

	}
}