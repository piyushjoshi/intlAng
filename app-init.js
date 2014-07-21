/**
 *  App bootstrap
 */
(function(window) {
	'use strict';
	var modules = window.modules || (window.modules = {});


	modules.intlApp = angular.module("intlApp", [ 'infinite-scroll' ]);

})(window);
