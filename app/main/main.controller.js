'use strict';

angular.module('teambreweryApp')
  .controller('MainCtrl', function ($scope, $http, $auth) {
    	$scope.$auth = $auth;
  });
