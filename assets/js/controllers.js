'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp.controllers', ["ngRoute","myApp.services","chart.js","myApp.filters"]);

app.controller('HeaderController', function($rootScope, $scope, $window) {
	
	$scope.showArrow = false;
	
	$scope.$on('changeShowArrow', function (event, valor) {
		
		console.log(valor);
		$scope.showArrow = valor;
		
		if (!$scope.$$phase) {
			$scope.$apply();
		}

	});

	$scope.voltar = function () {
		$window.history.back();
	}
})

app.controller('NavController', ['$scope', function ($scope) {
	
	$scope.showMenu = true;

	$scope.$on('abacate', function (event, valor) {
		$scope.showMenu = valor;
	});
}])

app.controller('MenuController', ['$scope', function($scope) {
}])

app.controller('HomeController', function($rootScope,$scope,User,Score,Home,$timeout){
 	
 	$rootScope.$broadcast('changeShowArrow',false);
	$scope.showScoreInicial = false;
	$scope.biggerScore = 0;

	var filtrar = function sorting () {};

	function maisJogados(a,b) {
	  	if (a.sum > b.sum)
	    	return -1;
	  	if (a.sum < b.sum)
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
				var limit = valores.length;
				var counter = 0;

				if ( valores.length > 30 ) {
					limit = 30;
					counter = valores.length - 30;
				}

		 		for (var i=0; i < limit; i++) {
		 			$scope.labels.push(counter + i);
		 			$scope.data.push(valores[counter  + i]);

		 			if (valores[i] > $scope.biggerScore) {
		 				$scope.biggerScore = valores[i];
		 			}
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

 		//console.dir(data);

		$scope.maisJogados  = data[0];
		$scope.maisVitorias = data[1];
		$scope.maisDerrotas = data[2];

		if (!$scope.$$phase) {
			$scope.$apply();
		}

 	}

 	var MapsNeverDieCallback = function (data) {
 		
 		//console.dir(data);

		$scope.mapasMaisJogados  = data[0];
		$scope.mapasMaisVitorias = data[1];
		$scope.mapasMaisDerrotas = data[2];

		if (!$scope.$$phase) {
			$scope.$apply();
		}

 	}

 	var SRsNeverDieCallback = function (data) {
 		
 		//console.dir(data);

		$scope.srMaior  = data.smaller;
		$scope.srMenor = data.bigger;

		if (!$scope.$$phase) {
			$scope.$apply();
		}

 	}

 	Home.srsNeverDie(SRsNeverDieCallback);
 	Home.heroesNeverDie(HeroesNeverDieCallback);
 	Home.mapsNeverDie(MapsNeverDieCallback);

  	Score.getScores(setGraphScore);
  	
  	if (!$scope.showScoreInicial) {
  		getScoreInicial();
  	}
})

app.controller('GameController', function($rootScope,$scope,Score,Heroes,Map,Game,$location){
	
	console.log("Game");
	$rootScope.$broadcast('changeShowArrow',true);

	var verifyForm = function () {
		
		var retorno = true;

		if (
			$scope.MapaSelecionado == undefined || 
			$scope.MapaSelecionado == null || 
			$scope.SrFinal == undefined || 
			$scope.SrFinal == null
			){
				retorno = false;
			}
			
		return retorno;
	}

	var resetarForm = function (msg) {

		$scope.msg 	   = msg;
		$scope.showMsg = 'active';

		if (!$scope.$$phase) {
			$location.path('/');
			$scope.$apply();
		}
	}

	var getHorario = function () {
		
		var a = new Date();
		
		hour = (a.getHours()<10?'0':'') + a.getHours();
		var minutes = (a.getMinutes()<10?'0':'') + a.getMinutes();

		var day 	= (a.getDate() < 10 ? '0' : '' ) + a.getDate();
		var month 	= (a.getMonth() < 10 ? '0' : '') + a.getMonth();

		$scope.startHour = hour+':'+minutes;
		$scope.startDate = day+'/'+month;
	}

	var hour = 0;

	$scope.startHour 	= "00:00";
	$scope.heroList 	= [];
	$scope.showMsg 		= false;
	$scope.SrInicial 	= Score.getScore();
	$scope.optionsHero 	= Heroes.getHeroes();
	$scope.optionsMaps 	= Map.getMaps();
	$scope.teamSR		= 0;
	$scope.enemySR		= 0;

	getHorario();

	$scope.adicionarHero = function (a) {

		if ($scope.heroList.indexOf( $scope.HeroSelecionado ) == -1 || $scope.HeroSelecionado != undefined) {
			$scope.heroList.push(JSON.parse($scope.HeroSelecionado));
			Game.setHeroes($scope.HeroSelecionado);
		}	
	}

	$scope.salvarJogo = function () {
		
		if (verifyForm()) {

			console.log("Entrada Corretas");
			Game.setSRs($scope.teamSR,$scope.enemySR);
			Game.setMap($scope.MapaSelecionado);
			Game.setScore($scope.SrFinal);
			Game.setHour(hour);
			Game.saveEntry(resetarForm);

		} else {
			console.log("Entradas Erradas")	
		}
	}
	
	$scope.SRs = function () {

		var a = $scope.teamSR;
		var b = $scope.enemySR;
	}

	$scope.startForm = function () {
		Game.resetGameObject();
	}
})

app.controller('LoginController', ['$rootScope', '$scope','User','$location', function($rootScope,$scope,User,$location) {

	$rootScope.$broadcast('changeShowArrow',false);

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
	        console.dir(error);
	    });

	}
}])
;