'use strict';

angular.module('teambreweryApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pokemon', {
        url: '/pokemon',
        templateUrl: 'app/pokemon/pokemon.html',
        controller: 'PokemonCtrl'
      }).state('pokemon.add', {
          url: '/add',
          templateUrl: 'app/pokemon/pokemon.add.html',
          controller: 'AddPokemonCtrl'
      });
  });