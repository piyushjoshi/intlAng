/**
 * 
 */

modules.intlApp.controller("intlCtrl", function($scope) {
	var defaultRecsVisible = 5, recsToAddOnScroll = 3;

	$scope.recList = model.getRecs();
	$scope.airlineInfo = model.getAirlineInfo();
	$scope.currentlyDisplayedRecs = defaultRecsVisible;

	$scope.scrollMore = function() {
		var totRecs = model.getRecs().length, i, log = "";
		i = totRecs - $scope.currentlyDisplayedRecs;
		log += $scope.currentlyDisplayedRecs + "---";
		$scope.currentlyDisplayedRecs += (i > recsToAddOnScroll ? recsToAddOnScroll : (i > 0) ? i : 0);
		log += $scope.currentlyDisplayedRecs;
		console.log(log);
	};

});

modules.intlApp.controller("recGroupController", function($scope) {
	console.log("$scope.recGroup" + $scope.recGroup.length);
});