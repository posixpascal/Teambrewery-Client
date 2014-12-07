'use strict';

angular.module('teambreweryApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teambuilder', {
          url: '/teambuilder',
          templateUrl: '/app/team/templates/team.html',
          controller: 'TeamCtrl'
      }).state('teambuilder.typechart', {
          url: '/typechart',
          controller: 'TeamCtrl',
          templateUrl: '/app/team/templates/typechart.html'
      }).state('teambuilder.fromSaveState', {
          url: '/savestate/:id', 
          controller: 'TeamCtrl'
      })
  });