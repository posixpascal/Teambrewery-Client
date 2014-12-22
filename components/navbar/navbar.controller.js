'use strict';
angular.module('teambreweryApp')
  .controller('NavbarCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {
    $scope.$auth = $auth;

    $scope.menu = [{
      'title': 'Teambuilder',
      'link': '/teams/new'
    },
    {
        'title': 'Community Teams',
        'link': '/teams/community'
    },
    {
      'title': 'Pokedex',
      'link': '/pokedex'
    }
    
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);