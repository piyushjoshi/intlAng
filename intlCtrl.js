/**
 * 
 */

modules.intlApp.controller("intlCtrl", function($scope) {
	$scope.recList = model.getRecs();
	$scope.airlineInfo = model.getAirlineInfo();
});