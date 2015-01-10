'use strict';

angular.module('teambreweryApp')
  .controller('MainController', function ($scope, $http, $auth) {
    	$scope.$auth = $auth;
  });
