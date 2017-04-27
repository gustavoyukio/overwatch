'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp.controllers', ["ngRoute","myApp.services","chart.js","myApp.filters"]);

app.controller('NavController', ['$scope', function ($scope) {
	
	$scope.showMenu = true;

	$scope.$on('abacate', function (event, valor) {
		$scope.showMenu = valor;
	});

}])

app.controller('MenuController', ['$scope', function($scope) {
}])

app.controller('HomeController', function($scope,User,Score,Home,$timeout){
 	
	$scope.showScoreInicial = false;
	function maisJogados(a,b) {
	  	if (a.sum > b.sum)
	    	return -1;
	  	if (a.sum < b.sum)
	    	return 1;
	  	return 0;
	}
	function maisVitorias(a,b) {
	  	if (a.wins > b.wins)
	    	return -1;
	  	if (a.wins < b.wins)
	    	return 1;
	  	return 0;
	}
	function maisDerrotas(a,b) {
	  	if (a.wins > b.wins)
	    	return -1;
	  	if (a.wins < b.wins)
	    	return 1;
	  	return 0;
	}

 	var setGraphScore = function (valores) {
 		
 		$scope.series = ['SR'];
  		$scope.datasetOverride = [{ xAxisID: 'jogos' }, { yAxisID: 'SR' }];
		
  		$scope.options = {
    		scales: {
      			yAxes: [
	        		{
						id: 'SR',
						type: 'linear',
						display: true,
						position: 'left'
					}
      			]
    		}
  		};

 		if (valores != undefined ) {

	 		$timeout(function(){

			  	$scope.labels = [];
				$scope.data   = [];

		 		for (var i=0; i < valores.length; i++) {
		 			$scope.labels.push(i);
		 			$scope.data.push(valores[i]);
		 		}

			}, 200);

 		}		
 	}

  	var scoreInicialCallback = function (value) {
  		
  		if (value) {
  			$scope.scoreInicialValue = value;
	  		$scope.showScoreInicial = true;
	  		if (!$scope.$$phase) {
	  			$scope.$apply();
	  		}	
  		}
  	} 	

  	$scope.setScoreInicial = function () {
  		Score.setScoreInicial($scope.scoreInicialValue, scoreInicialCallback);
  	}
  	var getScoreInicial = function () {
  		Score.getScoreInicial(scoreInicialCallback);
  	}

 	var HeroesNeverDieCallback = function (data) {
 		
 		var heroes = [];
 		
 		for (var i=0; i < Object.keys(data).length; i++) {

 			var sum = 0;
 			var win = 0;
 			var draw = 0;
 			var loss = 0;
 			var hero = Object.keys(data)[i];
 			
 			if (data[hero].win != null || data[hero].win != undefined) {
 				win = data[hero].win;
 			}
 			if (data[hero].draw != null || data[hero].draw != undefined) {
 				draw = data[hero].draw;
 			}
 			if (data[hero].loss != null || data[hero].loss != undefined) {
 				loss = data[hero].loss;
 			}
 			
 			sum = win + draw + loss;

 			var obj = {};
 			obj = {
 				'hero': hero,
 				'sum': sum,
 				'wins' : win,
 				'draws' : draw,
 				'losses' : loss
 			}

 			heroes.push(obj);
 		}

 		console.dir(heroes);

		$scope.maisJogados = heroes.sort(maisJogados);
		$scope.maisVitorias = heroes.sort(maisVitorias);
		$scope.maisDerrotas = heroes.sort(maisDerrotas);

		if (!$scope.$$phase) {
			$scope.$apply();
		}

 	}

 	var MapsNeverDieCallback = function (data) {
 		
 		var mapas = [];

 		for (var i=0; i < Object.keys(data).length; i++) {


 			var sum = 0;
 			var win = 0;
 			var draw = 0;
 			var loss = 0;
 			var mapa = Object.keys(data)[i];
 			
 			if (data[mapa].win != null || data[mapa].win != undefined) {
 				win = data[mapa].win;
 			}
 			if (data[mapa].draw != null || data[mapa].draw != undefined) {
 				draw = data[mapa].draw;
 			}
 			if (data[mapa].loss != null || data[mapa].loss != undefined) {
 				loss = data[mapa].loss;
 			}
 			
 			sum = win + draw + loss;

 			var obj = {};
 			obj = {
 				'mapa': mapa,
 				'sum': sum,
 				'wins' : win,
 				'draws' : draw,
 				'losses' : loss
 			}

 			mapas.push(obj);
 		}

 		console.dir(mapas);

		$scope.mapasMaisJogados = mapas.sort(maisJogados);
		$scope.mapasMaisVitorias = mapas.sort(maisVitorias);
		$scope.mapasMaisDerrotas = mapas.sort(maisDerrotas);

		if (!$scope.$$phase) {
			$scope.$apply();
		}

 	}

 	Home.heroesNeverDie(HeroesNeverDieCallback);
 	Home.mapsNeverDie(MapsNeverDieCallback);

  	Score.getScores(setGraphScore);
  	
  	if (!$scope.showScoreInicial) {
  		getScoreInicial();
  	}
  	
})

app.controller('GameController', function($scope,Score,Heroes,Map,Game,$location){
	
	$scope.startHour = "00:00";
	$scope.heroList = [];
	$scope.showMsg = false;
	$scope.SrInicial = Score.getScore();

	var hour = 0;

	var getHorario = function () {
		
		var a = new Date();
		
		hour = (a.getHours()<10?'0':'') + a.getHours();
		var minutes = (a.getMinutes()<10?'0':'') + a.getMinutes();
		// function to set hour to game
		$scope.startHour = hour+':'+minutes;

	}

	getHorario();

	// select to choose hero
	$scope.optionsHero = Heroes.getHeroes();
	$scope.optionsMaps = Map.getMaps();

	// adicionar hero
	$scope.adicionarHero = function () {

		if(
			$scope.heroList.indexOf( $scope.HeroSelecionado ) == -1 ||
			$scope.HeroSelecionado != undefined
		){
			$scope.heroList.push($scope.HeroSelecionado);
			Game.setHeroes($scope.HeroSelecionado);
		}
		
	}

	$scope.salvarJogo = function () {
		
		//verify
		if (verifyForm()) {

			Game.setMap($scope.MapaSelecionado);
			Game.setScore($scope.SrFinal);
			Game.setHour(hour);
			Game.saveEntry(resetarForm);

		} else {
			console.log("Entradas Erradas")	
		}
		
	}

	var verifyForm = function () {
		
		var retorno = true;
		if (
			$scope.MapaSelecionado == undefined || 
			$scope.MapaSelecionado == null || 
			$scope.SrFinal == undefined || 
			$scope.SrFinal == null
			) 
		{
			retorno = false;
		}
		return retorno;
	}

	var resetarForm = function (msg) {

		console.log("Jogo Adicionado com Sucesso");
		$scope.msg 	   = msg;
		$scope.showMsg = 'active';

		if (!$scope.$$phase) {
			$location.path('/');
			$scope.$apply();
		}

	}
	
})

app.controller('LoginController', ['$rootScope', '$scope','User','$location', function($rootScope,$scope,User,$location) {


	$rootScope.$broadcast('abacate',false);

	if (User.getLoggedStatus()) {

        $location.path('/adicionarJogo');

    } else {

	    var logIn = function (valor) {
			if (valor == true || valor) {
				$rootScope.$broadcast('abacate',true);
				if (!$scope.$$phase) {
					$location.path('/');
					$scope.$apply();
				}
			}
		}

    }

	

	$scope.googleLogin = function () {

		firebase.auth().signInWithPopup(provider).then(function(result) {
	        // This gives you a Google Access Token. You can use it to access the Google API.
	        var token = result.credential.accessToken;
	        // The signed-in user info.
	        var user = result.user;

	        if (user.uid != null) {
	          	User.setLoggedStatus(user, logIn)  
	          	// Mais pra frente, guardar dados
	          	//$location.path('/adicionarJogo');
	        }
	        // ...
	    }).catch(function(error) {
	        // Handle Errors here.
	        var errorCode = error.code;
	        var errorMessage = error.message;
	        // The email of the user's account used.
	        var email = error.email;
	        // The firebase.auth.AuthCredential type that was used.
	        var credential = error.credential;
	        // ...
	        console.log("OI");
	    });

	}
    
}])
;