'use strict';

angular.module('teambreweryApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/templates/intro.html',
        controller: 'MainCtrl'
      }).state('main.teams', {
      	url: 'teams',
      	templateUrl: 'app/main/teams/templates/list.html',
      	controller: 'TeamsCtrl'
      }).state('main.teams.new', {
      	url: '/new',
      	templateUrl: 'app/main/teams/templates/new.html',
      }).state('main.teams.community', {
      	url: '/community',
      	templateUrl: 'app/main/teams/templates/community.html'
      });
  });