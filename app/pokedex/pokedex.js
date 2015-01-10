'use strict';

angular.module('teambreweryApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pokedex', {
        url: '/pokedex',
        templateUrl: 'app/pokedex/templates/pokedex.html',
        controller: 'PokedexController'
      }).state('pokedex.view', {
          url: '/pokemon/:pokemon',
          templateUrl: 'app/pokedex/templates/pokemon.view.html',
          controller: 'PokedexController'
      });
  });