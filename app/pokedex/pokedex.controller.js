'use strict';

angular.module('teambreweryApp')
  .controller('PokedexCtrl', function ($scope, $http, Pokemon, $stateParams, $state) {
  	$scope.query = "";
  	$scope.pokemon = false;
  	$scope.stats = {
  		"hp": {
  			"cssclass": ""
  		},
  		"atk": {
  			"cssclass": ""
  		},
  		"def": {
  			"cssclass": ""
  		},
  		"spa": {
  			"cssclass": ""
  		},
  		"spd": {
  			"cssclass": ""
  		},
  		"spe": {
  			"cssclass": ""
  		},

  	}
  	$scope.load = function(){
  		if ($stateParams.pokemon){
  			Pokemon.byID($stateParams.pokemon).then(function(p){
  				$scope.pokemon = new Pokemon(p.data.pokemon);
  			});
  		}
  	}

  	$scope.getPokemonByName = function(name){
		return Pokemon.autocomplete(name).then(function(r){
			return _.map(r.data.pokemon, function(p){ return new Pokemon(p) });
		});
  	}

  	$scope.setActivePokemon = function($item, $model, $label){
  		$state.go('pokedex.view', {pokemon: $model.id});
  	}

  	$scope.evPercentage = function(pokemon, kind){
  		var ev = (pokemon.basestats[kind]);
  		var evPerc = (ev * 100) / 250;
  		if (ev > 130){ $scope.stats[kind].cssclass = "progress-bar-primary" }
  		else if (ev > 105){ $scope.stats[kind].cssclass = "progress-bar-success" }
  		else if (ev > 70){ $scope.stats[kind].cssclass = "progress-bar-warning" }
  		else if (ev < 71) { $scope.stats[kind].cssclass = "progress-bar-danger" }

  		return evPerc + "%";
  	}

  	$scope.load();
  });
