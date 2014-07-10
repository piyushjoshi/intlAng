/**
 *  App bootstrap
 */
(function(window) {
	'use strict';
	var intlApp = window.intlApp || (window.intlApp = {});

	intlApp.modules = intlApp.modules || {};

	intlApp.modules.mainModule = angular.module("intlApp", [ 'infinite-scroll' ]);

})(window);