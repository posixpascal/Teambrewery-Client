'use strict';

angular.module('teambreweryApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('team', {
          url: '/team/:id',
          templateUrl: '/app/team/templates/team.html',
          controller: 'TeamController',
      }).state('team.pokemon', {
        url: '/pokemon',
        templateUrl: '/app/team/pokemon/templates/all.html',
        controller: 'TeamPokemonController'
      }).state('team.pokemon.view', {
        url: '/view/:index',
        templateUrl: '/app/team/pokemon/templates/view.html',

      }).state('team.typechart', {
          url: '/typechart',
          templateUrl: '/app/team/templates/typechart.html'
      }).state('team.moveset_coverage', {
        url: '/moveset-coverage',
        templateUrl: '/app/team/templates/moveset_coverage.html'
      })
      .state('team.settings', {
        url: '/settings',
        templateUrl: '/app/team/templates/settings.html'
      }).state('team.publish', {
        url: '/publish',

        templateUrl: '/app/team/templates/publish.html'
      }).state('team.pokemons', {
        url: "/pokemons",
        templateUrl: '/app/team/pokemon/templates/all.html'
      }).state('team.pokemon.list', {
        url: '/:group/:query',
        templateUrl: '/app/team/pokemon/templates/list.html'
      }).state('team.pokemon.add', {
        url: '/:pokemon/add',
        templateUrl: '/app/team/pokemon/templates/add.html'
      })
  });