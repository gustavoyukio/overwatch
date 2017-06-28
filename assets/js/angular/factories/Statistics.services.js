/*
app.service('Statistics', function ($rootScope) {

    var Statistics = function () {

        var _self = this;

        _self.data = {};

        _self.mapas = function () {

            var listaDeMapas = {};
            var estatisticaDoMapa = function (game, callback) {

                var _obj = this;

                this.win = 0;
                this.draw = 0;
                this.loss = 0;
                this.total = 0;
                this.winPercentage = 0;
                this.lossPercentage = 0;
                this.map = game.map;

                this.add = function (game) {

                    if (game.label == 'win') _obj.win++;
                    if (game.label == 'loss') _obj.loss++;
                    if (game.label == 'draw') _obj.draw++;

                    _obj.total++;
                    _obj.winPercentage = (_obj.win / _obj.total) * 100;
                    _obj.lossPercentage = (_obj.loss / _obj.total) * 100;

                }

                this.add(game);

            }
            this.getData = function () {
                return Object.values(listaDeMapas);
            }
            this.process = function (game, callback, counter) {

                if (counter == 0) {
                    listaDeMapas[game.map] = new estatisticaDoMapa(game, callback);
                } else {
                    if (listaDeMapas[game.map] == null) {
                        listaDeMapas[game.map] = new estatisticaDoMapa(game, callback);
                    } else {
                        listaDeMapas[game.map].add(game, callback);
                    }
                }
            }
        }

        _self.herois = function () {

            var listaDeHerois = {};

            var estatisticaDoHeroi = function (game, hero) {

                var _obj = this;

                this.win = 0;
                this.draw = 0;
                this.loss = 0;
                this.total = 0;
                this.winPercentage = 0;
                this.lossPercentage = 0;
                this.hero = hero;

                this.add = function (game) {

                    if (game.label == 'win') _obj.win++;
                    if (game.label == 'loss') _obj.loss++;
                    if (game.label == 'draw') _obj.draw++;

                    _obj.total++;
                    _obj.winPercentage = (_obj.win / _obj.total) * 100;
                    _obj.lossPercentage = (_obj.loss / _obj.total) * 100;

                }

                this.add(game);

            }

            this.getData = function () {
                return Object.values(listaDeHerois);
            }

            this.process = function (game) {

                for (var i = 0; i < game.heroes.length; i++) {

                    if (listaDeHerois[game.heroes[i]] == null) {
                        listaDeHerois[game.heroes[i]] = new estatisticaDoHeroi(game,game.heroes[i])
                    } else {
                        listaDeHerois[game.heroes[i]].add(game);
                    }

                }
            }
        }

        _self.heroisPorMapa = function () {
            var listaDeHeroisPorMapas = {};

            var estatisticaDoHeroiPorMapa = function (game, map, hero) {

                var _obj = this;

                this.win = 0;
                this.draw = 0;
                this.loss = 0;
                this.total = 0;
                this.winPercentage = 0;
                this.lossPercentage = 0;
                this.hero = hero;
                this,map = map;

                this.add = function (game) {

                    if (game.label == 'win') _obj.win++;
                    if (game.label == 'loss') _obj.loss++;
                    if (game.label == 'draw') _obj.draw++;

                    _obj.total++;
                    _obj.winPercentage = (_obj.win / _obj.total) * 100;
                    _obj.lossPercentage = (_obj.loss / _obj.total) * 100;

                }

                this.add(game);

            }
            
            this.getData = function () {
                return listaDeHeroisPorMapas;
            }
            this.process = function (game, callback) {

                if (listaDeHeroisPorMapas[game.map] == null) {
                    listaDeHeroisPorMapas[game.map] = {};
                }

                for (var i = 0; i < game.heroes.length; i++) {
                    if (listaDeHeroisPorMapas[game.map][game.heroes[i]] == null) {
                        listaDeHeroisPorMapas[game.map][game.heroes[i]] = new estatisticaDoHeroiPorMapa(game, game.map, game.heroes[i])
                    } else {
                        listaDeHeroisPorMapas[game.map][game.heroes[i]].add(game, callback);
                    }
                }
            }           
        }

        _self.mapasPorHeroi = function () {
            var listaDeMapasPorHeroi = {};

            var estatisticaDeMapaPorHeroi = function (game, map, hero) {

                var _obj = this;

                this.win = 0;
                this.draw = 0;
                this.loss = 0;
                this.total = 0;
                this.winPercentage = 0;
                this.lossPercentage = 0;
                this.hero = hero;
                this.map = map;

                this.add = function () {

                    if (game.label == 'win') _obj.win++;
                    if (game.label == 'loss') _obj.loss++;
                    if (game.label == 'draw') _obj.draw++;

                    _obj.total++;
                    _obj.winPercentage = (_obj.win / _obj.total) * 100;
                    _obj.lossPercentage = (_obj.loss / _obj.total) * 100;
                }

                this.add(game);

            }

            this.getData = function () {
                return listaDeMapasPorHeroi;
            }               

            this.process = function (game, callback) {

                for (var i = 0; i < game.heroes.length; i++) {

                    if (listaDeMapasPorHeroi[game.heroes[i]] == null) {
                        listaDeMapasPorHeroi[game.heroes[i]] = {}
                    }

                    if (listaDeMapasPorHeroi[game.heroes[i]][game.map] == null) {
                        listaDeMapasPorHeroi[game.heroes[i]][game.map] = new estatisticaDeMapaPorHeroi(game, game.map, game.heroes[i])
                    } else {
                        listaDeMapasPorHeroi[game.heroes[i]][game.map].add(game,callback);
                    }

                }

            }           
        }

        _self.tipos = function () {
            var tipos = {};

            var estatisticaDoHeroi = function (game,tipo) {

                var _obj = this;

                this.win = 0;
                this.draw = 0;
                this.loss = 0;
                this.total = 0;
                this.winPercentage = 0;
                this.lossPercentage = 0;
                this.tipo = tipo;

                this.add = function (game) {

                    if (game.label == 'win') _obj.win++;
                    if (game.label == 'loss') _obj.loss++;
                    if (game.label == 'draw') _obj.draw++;

                    _obj.total++;
                    _obj.winPercentage = (_obj.win / _obj.total) * 100;
                    _obj.lossPercentage = (_obj.loss / _obj.total) * 100;

                }

                this.add(game);

            }

            this.getData = function () {
                //console.dir(tipos);
                return Object.values(tipos);
            }

            this.process = function (game,callback) {

                for (var i = 0; i < game.types.length; i++) {

                    if (tipos[game.types[i]] == null) {
                        tipos[game.types[i]] = new estatisticaDoHeroi(game,game.types[i])
                    } else {
                        tipos[game.types[i]].add(game,callback);
                    }

                }
            }           
        }

        _self.scores = function () {

            var listaScores = {};
            var _self = this;

            var resultados = function (game) {

                this.scores = [];

                this.add = function (game) {
                    this.scores.push(game.score);
                }

                this.add(game);
            }

            this.getData = function () {
                //console.log(listaScores);
                var results = Object.values(listaScores);
                return results[0].scores;
            }

            this.process = function (game, callback, counter) {
                if (counter == 0) {
                    listaScores['scores'] = new resultados(game);
                } else {
                    if (listaScores['scores'] == null) {
                        listaScores['scores'] = new resultados(game);
                    } else {
                        listaScores['scores'].add(game);
                    }   
                }
            }           
        }

        _self.sr = function () {
            var sr = {};

            var estatisticaDoSr = function (game, label) {

                var _obj = this;

                this.win = 0;
                this.draw = 0;
                this.loss = 0;
                this.total = 0;
                this.winPercentage = 0;
                this.lossPercentage = 0;
                this.label = label;

                this.add = function (game) {

                    if (game.label == 'win') _obj.win++;
                    if (game.label == 'loss') _obj.loss++;
                    if (game.label == 'draw') _obj.draw++;

                    _obj.total++;
                    _obj.winPercentage = (_obj.win / _obj.total) * 100;
                    _obj.lossPercentage = (_obj.loss / _obj.total) * 100;

                }

                this.add(game);

            }

            this.getData = function () {
                return sr;
            }

            this.process = function (game,callback) {


                if (game.srs.enemy > game.srs.team) {                   
                    if (sr['Menor'] == null) {
                        sr['Menor'] = new estatisticaDoSr(game,'Menor')
                    } else {
                        sr['Menor'].add(game);
                    }
                } else if (game.srs.enemy < game.srs.team) {
                    if (sr['Maior'] == null) {
                        sr['Maior'] = new estatisticaDoSr(game,'Maior')
                    } else {
                        sr['Maior'].add(game);
                    }
                } else {
                    if (sr['Igual'] == null) {
                        sr['Igual'] = new estatisticaDoSr(game,'Igual')
                    } else {
                        sr['Igual'].add(game);
                    }
                }
            }           
        }

        _self.sizes = function () {
            var sizes = {};

            var estatisticaDeSizes = function (game, label) {

                var _obj = this;

                this.win = 0;
                this.draw = 0;
                this.loss = 0;
                this.total = 0;
                this.winPercentage = 0;
                this.lossPercentage = 0;
                this.label = label;

                this.add = function (game) {

                    if (game.label == 'win') _obj.win++;
                    if (game.label == 'loss') _obj.loss++;
                    if (game.label == 'draw') _obj.draw++;

                    _obj.total++;
                    _obj.winPercentage = (_obj.win / _obj.total) * 100;
                    _obj.lossPercentage = (_obj.loss / _obj.total) * 100;

                }

                this.add(game);

            }

            this.getData = function () {
                return sizes;
            }

            this.process = function (game,callback) {

                if (sizes[game.party] == null) {
                    sizes[game.party] = new estatisticaDeSizes(game)
                } else {
                    sizes[game.party].add(game);
                }

            }           
        }

        _self.sides = function () {
            var sides = {};

            var estatisticaDeSides = function (game, label) {

                var _obj = this;

                _obj.win = 0;
                _obj.draw = 0;
                _obj.loss = 0;
                _obj.total = 0;
                _obj.winPercentage = 0;
                _obj.lossPercentage = 0;
                _obj.side = label;

                this.add = function (game) {

                    if (game.label == 'win') _obj.win++;
                    if (game.label == 'loss') _obj.loss++;
                    if (game.label == 'draw') _obj.draw++;

                    _obj.total++;
                    _obj.winPercentage = (_obj.win / _obj.total) * 100;
                    _obj.lossPercentage = (_obj.loss / _obj.total) * 100;

                }

                this.add(game);

            }

            this.getData = function () {
                return sides;
            }

            this.process = function (game,callback) {

                if (sides[game.side] == null) {
                    sides[game.side] = new estatisticaDeSides(game, game.side)
                } else {
                    sides[game.side].add(game, game.side);
                }

            }           
        }       

        // Start Calling
        _self.start = function (dados) {

            // Instancias dos Objetos
            _self.heroisArray   = new _self.herois();
            _self.heroisPorMapa = new _self.heroisPorMapa();
            _self.mapasPorHeroi = new _self.mapasPorHeroi();
            _self.tipos         = new _self.tipos();
            _self.scores        = new _self.scores();
            _self.sr            = new _self.sr();
            _self.sizes         = new _self.sizes();
            _self.sides         = new _self.sides();
            _self.mapas         = new _self.mapas();
            
            for (var i = 0; i < dados.length; i++) {

                _self.sr.process(dados[i]);
                _self.mapas.process(dados[i]);
                _self.tipos.process(dados[i]);
                _self.sizes.process(dados[i]);
                _self.sides.process(dados[i]);
                _self.heroisArray.process(dados[i]);
                _self.scores.process(dados[i]);
                _self.heroisPorMapa.process(dados[i]);
                _self.mapasPorHeroi.process(dados[i]);

            }

            _self.scores.getData();

        }

    }

    return new Statistics();

})
*/