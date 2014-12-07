angular.module("teambreweryApp").directive('statDistribution', ['calcStat', function(calcStat){
        return {
            restrict: 'E',
            scope: true,
            replace: true,
            templateUrl: "app/pokemon/templates/stats.html",
            link: function(scope){
                scope.calcStat = calcStat;
            }
        }
    }]).service("statFormula", [function(){
    var defaultStat = function defaultStat(base, ev, iv, nature){
        return Math.floor( ( ( ( (iv + 2 * base + ev/4) * 100) / 100) + 5) * nature);
    };
    return {
        'hp': function(base, ev, iv){
            return Math.floor(((iv + 2 * base + ev/4 + 100) * 100) / 100 + 10);
        },
        'atk': defaultStat,
        'def': defaultStat,
        'spa': defaultStat,
        'spd': defaultStat,
        'spe': function(base, ev, iv, nature){
            return Math.floor(((((iv + 2 * base + (ev / 4)) * 100) / 100) + 5) * nature);
        }
    }
}]).service("calcStat", ['statFormula', function(statFormula){
    return function(base, kind, ev, nature){
        if (typeof ev === "undefined") ev = 0;
        if (typeof iv === "undefined") iv = 31;
        if (typeof nature === "undefined") nature = 1.0;
        return statFormula[kind](base, ev, iv, nature);
    }
}
])