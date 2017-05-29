'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp.controllers', ["ngRoute","myApp.services","chart.js","myApp.filters",'ngCookies']);

app.controller('BodyController', function ($rootScope, $scope) {

	$scope.class = "login";

	$scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
    	if ($previousRoute.$$route.controller == "LoginController") {
    		$scope.class = "login"
    	} else {
    		$scope.class = ""
    	}
	});
})

app.controller('HeaderController', function($rootScope, $scope, $window) {
	
	$scope.showArrow = false;
	
	$scope.$on('changeShowArrow', function (event, valor) {
		
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

	$scope.$on('changeShowMenu', function (event, valor) {
		$scope.showMenu = valor;
	});
}])

app.controller('MenuController', ['$scope', function($scope) {
}])

app.controller('HomeController', function($rootScope,$scope,User,Score,Home,$timeout,$http){
 	
 	$rootScope.$broadcast('changeShowArrow',false);
	$scope.showScoreInicial = false;
	$scope.biggerScore = 0;

 	var setGraphScore = function (valores) {
 		
 		$scope.series = ['SR'];
  		$scope.datasetOverride = [{ xAxisID: 'jogos' }, { yAxisID: 'SR' }];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
		
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

 	var setGraphHeroes = function (valores) {
 		
 		$scope.labelHeroes = [];
 		$scope.heroes 	   = [];

 		var tamanho = Object.keys(valores);

 		for (var i=0; i<tamanho;i++) {

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

    // callbacks
  	$scope.setScoreInicial = function () {
  		Score.setScoreInicial($scope.scoreInicialValue, scoreInicialCallback);
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

		$scope.mapasMaisJogados  = data[0];
		$scope.mapasMaisVitorias = data[1];
		$scope.mapasMaisDerrotas = data[2];

		if (!$scope.$$phase) {
			$scope.$apply();
		}
 	}
 	var SRsNeverDieCallback = function (data) {
 		
 		console.dir(data);

		$scope.scores  = data;

		if (!$scope.$$phase) {
			$scope.$apply();
		}
 	}
 	var SizesNeverDieCallback = function (data) {
 		$scope.partySizes = data;
 	}

    var typesNeverDieCallback = function (valor) {
        $scope.classes = valor;
    }

    //Start Function
    var getScoreInicial = function () {
        Score.getScoreInicial(scoreInicialCallback);
    } 

 	Home.srsNeverDie(SRsNeverDieCallback);
 	Home.heroesNeverDie(HeroesNeverDieCallback);
 	Home.mapsNeverDie(MapsNeverDieCallback);
 	Home.sizesNeverDie(SizesNeverDieCallback);
    Home.typesNeverDie(typesNeverDieCallback);

  	Score.getScores(setGraphScore);
  	Score.getHeroesInicial(setGraphHeroes);
  	
  	if (!$scope.showScoreInicial) {
  		getScoreInicial();
  	}

})
;