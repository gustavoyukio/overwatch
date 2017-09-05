'use strict';

var teste = null;
var abacate = null;

// Declare app level module which depends on views, and components
var app = angular.module('myApp.controllers', ["ngRoute","myApp.services","chart.js","myApp.filters",'ngCookies']);

app.controller('BodyController', function ($rootScope, $scope, User, $cookies) {

	$scope.class = "login";

	$scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
    
    if ($previousRoute.$$route.controller == "LoginController") {
        $scope.class = "login"
    } else {
        $scope.class = ""
    }

    $scope.user = $cookies.get('userName');

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

app.controller('HomeController', function($rootScope,$scope,User,Score,Home,$timeout,$http,Statistics,$cookies){

    // Apenas quando trocar de temporada
    Home.setNewSeason();
    // Data calling
    //Home.getStatistics();
    /*
    *
    */
        $scope.abacate = 1;

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
        var setGraphScores = function (valores) {

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
                },
                tooltips: {
                    callbacks: {
                        labelColor: function(tooltipItem, chart) {
                            return {
                                borderColor: 'rgb(255, 0, 0)',
                                backgroundColor: 'rgb(255, 0, 0)'
                            }
                        },
                        title: function (a,b) {
                            return "Partida: " + a[0].xLabel
                        },
                        label: function (a,b) {

                            var diferenca = 0;
                            
                            var index = a.index;

                            var atual = b.datasets[0].data[index];
                            var past = b.datasets[0].data[index-1];

                            var diferenca = atual - past;
                            
                            return "SR: " + atual + " ("+diferenca+")";
                        }
                    }
                }
            };

            Chart.defaults.global.tooltipTemplate = function(value) {
                if (value.label)  {
                    return value.label + ":" + value.value;
                } else {
                    return value.value;
                }
            };
            Chart.defaults.global.multiTooltipTemplate = function(value) {
                return 'The value is ' + value.value;
            };

            $scope.scoreHighest = 0;
            $scope.scoreCurrent = 0;
            var counter = 0;
            var limit = 30;

            $scope.labels = [];
            $scope.labels.length = 0;
            $scope.data   = [];
            $scope.data.length = 0;

            $scope.jogos = {};
            $scope.jogos.total = valores.length;

            if ( valores.length > 30 ) {
                counter = valores.length - 30;
            }

            for (counter; counter < valores.length; counter++) {

                $scope.labels.push(counter + 1);
                $scope.data.push(valores[counter]);

                if (valores[counter] > $scope.scoreHighest) {
                    $scope.scoreHighest = valores[counter];
                }

                if (counter == limit-1) {
                    $scope.scoreCurrent = valores[counter];
                }
            }

        }

        var setDoughnut = function (valores) {
            $scope.doughnut = {};
            $scope.doughnut.labels = [];
            $scope.doughnut.data = [];

            valores.map(function(arr,index){
                $scope.doughnut.labels.push(arr.tipo);
                $scope.doughnut.data.push(arr.total);
            });

            console.log($scope.doughnut);
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
     *
     * Change Tab Function
     * 
     */
    
    $scope.tab = {};
    $scope.tab.active = 'geral';

    $scope.changeTab = function (val) {
        $scope.tab.active = val;
        $scope.tab.class = val;
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

        $rootScope.listaDeScores = [];
        $rootScope.porMapa = [];

        $rootScope.$watch('listaDeScores', function () {
            if ($rootScope.listaDeScores.length > 0) {
                setGraphScore($rootScope.listaDeScores);
            }
        });
        $rootScope.$watch('porMapa', function () {
            if ($rootScope.porMapa.length > 0) {
                $scope.dados.porMapa = $rootScope.porMapa;
            }
        });  

        $timeout(function(){

            //console.dir(Statistics);

            $scope.dados = {};

            var herois  = Statistics.herois.getData();
            var mapas   = Statistics.mapas.getData();
            var tipos   = Statistics.tipos.getData();

            var porMapa     = Statistics.heroisPorMapa.getData();
            var porHeroi    = Statistics.mapasPorHeroi.getData();
            var porSr       = Statistics.sr.getData();
    
            var porSize     = Statistics.sizes.getData();
            var porSide     = Statistics.sides.getData();

            var scores      = Statistics.scores.getData();

            $scope.dados.herois = herois;
            $scope.dados.mapas  = mapas;
            $scope.dados.tipos  = tipos;

            $scope.dados.porMapa    = porMapa;
            $scope.dados.porHeroi   = porHeroi;
            $scope.dados.porSr      = porSr;
            
            $scope.dados.porSize    = porSize;
            $scope.dados.porSide    = porSide;
            
            setDoughnut(tipos);
            setGraphScores(scores);

        }, 1500);

    if (!$scope.showScoreInicial) {
        getScoreInicial();
    }

})
;