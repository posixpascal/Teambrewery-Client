angular.module("teambreweryApp").value("API_PATH", "http://teambrewery.dev:3333/api").value("api", function(path){
	return "http://teambrewery.dev:3333/api/" + path;
});