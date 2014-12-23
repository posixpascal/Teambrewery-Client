'use strict';

angular.module('teambreweryApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ng-token-auth',
  'ui.router',
  'ui.bootstrap',
    'angular-loading-bar',
    'cgNotify',
    'smart-table'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }).config(function ($authProvider){
    $authProvider.configure({
      'apiUrl': 'http://teambrewery.dev:3333',
      'authProviderPaths': {
        facebook: '/auth/facebook',
        twitter: '/auth/twitter'
      }

    })
  });