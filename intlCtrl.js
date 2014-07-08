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

modules.intlApp.controller("recGroupCtrl", function($scope) {
	console.log("$scope.recGroup" + $scope.recGroup.length);

	// transform recGroup array to array of radioButtonGroups
	var arrOfGroups = [], i = 0;

	$scope.isSingleRec = ($scope.recGroup.length === 1);

	for (; i < $scope.recGroup[0].segments.length; i++) {
		var arrRadio = [], radios = {}, radioKey = "";

		angular.forEach($scope.recGroup, function(rec) {
			radioKey = "_";
			angular.forEach(rec.segments[i].groupOfFlights, function(flight) {
				radioKey += flight.flightNumber + "_";
			});
			if (!radios[radioKey]) {
				radios[radioKey] = [];
			}
			radios[radioKey].push(rec);
		});
		angular.forEach(radios, function(recs) {
			arrRadio.push({
				recs : recs,
				segment : recs[0].segments[i]
			});
		});
		arrOfGroups.push(arrRadio);
	}

	$scope.radioGroups = arrOfGroups;
	$scope.selectedRec = $scope.recGroup[0];

	$scope.boundedRecsRegistry = [];
	$scope.validateRadioSelection = function(groupIndex, newRecs) {

	};
});

modules.intlApp.controller("radioGroupCtrl", function($scope) {
	var defaultSelectedRec = $scope.selectedRec, i = 0;
	for (; i < $scope.radioGroup.length; i++) {
		if ($scope.radioGroup[i].recs.indexOf(defaultSelectedRec) >= 0) {
			$scope.selectedRadioIndex = i;
			$scope.boundedRecsRegistry[$scope.radioGroup[i].segment.index] = $scope.radioGroup[i].recs;
			break;
		}
	}
	$scope.radioClick = function(index) {
		var previousSelection = $scope.selectedRec;
		if ($scope.radioGroup[index].recs.indexOf(previousSelection) === -1) {
			console.log("selection changed! Previous: " + previousSelection.index + ", new selection: " + $scope.radioGroup[index].recs.map(function(rec) {
				return rec.index;
			}));
		}
		$scope.validateRadioSelection($scope.radioGroup[index].segment.index, $scope.radioGroup[index].recs);
		console.log("previous selection = " + $scope.selectedRadioIndex);
		console.log("clicked on = " + index);
	};
});