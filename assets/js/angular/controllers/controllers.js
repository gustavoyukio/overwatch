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

app.controller('HomeController', function($rootScope,$scope,User,Score,Home,$timeout,$http,Statistics){
 	
    // Apenas quando trocar de temporada
    //Home.setNewSeason();
    // Data calling
    Home.getStatistics();

    $rootScope.$broadcast('changeShowArrow',false);
    $scope.showScoreInicial = false;

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

                var data = valores[0].scores;

                $scope.labels = [];
				$scope.data   = [];
                $scope.scoreHighest = 0;
                $scope.scoreCurrent = 0;
				var limit = data.length;
				var counter = 0;

				if ( data.length > 30 ) {
					limit = 30;
					counter = data.length - 30;
				}

		 		for (var i=0; i < limit; i++) {
		 			$scope.labels.push(counter + i);
		 			$scope.data.push(data[counter  + i]);

		 			if (data[i] > $scope.scoreHighest) {
		 				$scope.scoreHighest = data[i];
		 			}

                    if (i == limit-1) {
                        $scope.scoreCurrent = data[i];
                    }
		 		}

                

			}, 200);

 		}

 	}

    // Score
  	$scope.setScoreInicial = function () {
  		Score.setScoreInicial($scope.scoreInicialValue, scoreInicialCallback);
  	}
    var getScoreInicial = function () {
        Score.getScoreInicial(scoreInicialCallback);
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

    $timeout(function(){

        $scope.dados = {};

        var herois = Statistics.herois.getData();
        var mapas = Statistics.mapas.getData();
        var tipos = Statistics.tipos.getData();

        var porMapa = Statistics.heroisPorMapa.getData();
        console.dir(Statistics.tipos.getData());

        $scope.dados.herois = herois;
        $scope.dados.mapas = mapas;
        $scope.dados.tipos = tipos;

        $scope.dados.porMapa = porMapa;

    	
    }, 1000);
  	
  	if (!$scope.showScoreInicial) {
  		getScoreInicial();
  	}

})
;