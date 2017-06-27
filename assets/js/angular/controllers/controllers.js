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
    $scope.melhores = {
        mapas: {
            nome: '',
            valor: 0
        },
        hero: {
            nome: '',
            valor: 0,
            pior: '',
            piorValor: 0
        },
        hour: {
            nome: '',
            valor: 0
        }
    };

    /*
     * Graph Setup
     * Inicialização do Grafico e adicao de Pontos
     *
     */
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

                    var data = valores;

                    if (valores.length > 30) {
                        data = valores.splice(valores.length-30,30);
                    }
                    

                    $scope.labels = [];

                    $scope.data   = [];
                    $scope.data.length = 0;

                    $scope.scoreHighest = 0;
                    $scope.scoreCurrent = 0;

                    var limit = data.length;
                    var counter = 0;

                    if ( data.length > 30 ) {
                        limit = 30;
                        counter = data.length - 30;
                    }

                    //console.log(scores)

                    for (var i=0; i < limit; i++) {

                        $scope.labels.push(i + 1);
                        $scope.data.push(data[i]);

                        if (data[i] > $scope.scoreHighest) {
                            $scope.scoreHighest = data[i];
                        }

                        if (i == limit-1) {
                            $scope.scoreCurrent = data[i];
                        }
                    }

                    //console.dir($scope.data);

                }, 200);
            }
        }

    /*
     *
     * Callbacks para para melhores
     *
     */

        $scope.melhorMapa = function (a,b) {

            if (parseInt(b) > parseInt($scope.melhores.mapas.valor)) {
                $scope.melhores.mapas.nome = a;
                $scope.melhores.mapas.valor = parseInt(b);
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }
        $scope.melhorHeroi = function (a,b) {

            if (parseInt(b) > parseInt($scope.melhores.hero.valor)) {
                $scope.melhores.hero.nome = a;
                $scope.melhores.hero.valor = parseInt(b);
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }
        $scope.piorHeroi = function (a,b) {

            if (parseInt(b) > parseInt($scope.melhores.hero.piorValor)) {
                $scope.melhores.hero.pior = a;
                $scope.melhores.hero.piorValor = parseInt(b);
            }

            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }

    /*
     * Data Setup
     * Inicialização do callbcks de Dados
     *
     */
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

            /*
            $scope.dados = {};

            $scope.dados.herois     = Statistics.heroisArray.getData();
            $scope.dados.mapas      = Statistics.mapas.getData();
            $scope.dados.tipos      = Statistics.tipos.getData();

            $scope.dados.porMapa    = Statistics.heroisPorMapa.getData();
            $scope.dados.porHeroi   = Statistics.mapasPorHeroi.getData();
            $scope.dados.porSr      = Statistics.sr.getData();
            
            $scope.dados.porSize    = Statistics.sizes.getData();
            $scope.dados.porSide    = Statistics.sides.getData();

            setGraphScore(Statistics.scores.getData());
            */
            Statistics.getScores(scoreCallback);
            Statistics.getHerois(heroisCallback);
            Statistics.getMapas(mapasCallback);

        }, 1500);

        /*
         * Callbacks
         */
            var scoreCallback = function (data) {
                 setGraphScore(data);
            }

            var heroisCallback = function (data) {
                $scope.herois = data;
            }

            var mapasCallback = function (data) {
                $scope.mapas = data;
            }

        /*
         *  Initial Show Score Inicial
         */
            if (!$scope.showScoreInicial) {
                getScoreInicial();
            }
})
;