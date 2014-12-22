'use strict';

angular.module('teambreweryApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teambuilder', {
          url: '/teambuilder/:id',
          templateUrl: '/app/team/templates/team.html',
          controller: 'TeamCtrl'
      }).state('teambuilder.typechart', {
          url: '/typechart',
          templateUrl: '/app/team/templates/typechart.html'
      }).state('teambuilder.moveset_coverage', {
        url: '/moveset-coverage',
        templateUrl: '/app/team/templates/moveset_coverage.html'
      })
      .state('teambuilder.settings', {
        url: '/settings',
        templateUrl: '/app/team/templates/settings.html'
      }).state('teambuilder.publish', {
        url: '/publish',

        templateUrl: '/app/team/templates/publish.html'
      }).state('teambuilder.pokemons', {
        url: "/pokemons",
        templateUrl: '/app/team/pokemon/templates/all.html'
      }).state('teambuilder.pokemon.list', {
        url: '/:group/:query',
        templateUrl: '/app/team/pokemon/templates/list.html'
      }).state('teambuilder.pokemon.add', {
        url: '/:pokemon/add',
        templateUrl: '/app/team/pokemon/templates/add.html'
      }).state('teambuilder.pokemon.view', {
        url: '/:pokemon',
        templateUrl: '/app/team/pokemon/templates/view.html'
      });
  });