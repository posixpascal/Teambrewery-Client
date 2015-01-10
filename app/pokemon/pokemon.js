'use strict';

angular.module('teambreweryApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pokemon', {
        url: '/pokemon',
        templateUrl: 'app/pokemon/pokemon.html',
        controller: 'PokemonController'
      }).state('pokemon.add', {
          url: '/add',
          templateUrl: 'app/pokemon/pokemon.add.html',
          controller: 'AddPokemonController'
      });
  });