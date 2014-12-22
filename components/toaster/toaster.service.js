angular.module('teambreweryApp').factory('Toaster', function(){
	"use strict";
	var defaultOptions = {};
	return {
		success: function(message, title, options){
			toastr.options.progressBar = true;
			toastr.options.showMethod = 'fadeIn';
			toastr.options.hideMethod = 'fadeOut';
			toastr.success(message);
		}
	};
});