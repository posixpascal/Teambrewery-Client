angular.module("teambreweryApp").directive('weaknessTable', [function(){
           return {
                restrict: 'E',
                scope: true,
                transclude: true,
                replace: true,
                templateUrl: "app/team/templates/weakness_table.html",
                link: function(scope, element, attrs){

                }
            }
        }
    ])