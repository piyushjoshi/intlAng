/**
 * 
 */

modules.intlApp.controller("listingCtrl", function($scope) {
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
	$scope.selectedRadioIndexRegistry = [];

	$scope.validateRadioSelection = function(groupIndex, newRecs) {
		var temp = $scope.boundedRecsRegistry.slice(0), intersection;
		temp[groupIndex] = newRecs;
		intersection = _.intersection.apply(_, temp)[0];
		if (intersection) {
			$scope.selectedRec = intersection;
			return true;
		} else {
			return false;
		}
	};
	$scope.enforceSelection = function(groupIndex, newRecs) {
		var newSelectedRec = newRecs[0];
		if (newSelectedRec) {
			$scope.selectedRec = newSelectedRec;
			$scope.selectedRadioIndexRegistry = $scope.radioGroups.map(function(radioGroup) {
				return radioGroup.map(function(radioObj) {
					return radioObj.recs.indexOf(newSelectedRec) >= 0;
				}).indexOf(true);
			});
			$scope.boundedRecsRegistry = $scope.selectedRadioIndexRegistry.map(function(radioObjIndex, segmentIndex) {
				return $scope.radioGroups[segmentIndex][radioObjIndex].recs;
			});
		}
	};
});

modules.intlApp.controller("radioGroupCtrl", function($scope) {
	var defaultSelectedRec = $scope.selectedRec, i = 0;
	for (; i < $scope.radioGroup.length; i++) {
		if ($scope.radioGroup[i].recs.indexOf(defaultSelectedRec) >= 0) {
			$scope.selectedRadioIndexRegistry[$scope.radioGroup[i].segment.index] = i;
			$scope.previousSelection = i;
			$scope.boundedRecsRegistry[$scope.radioGroup[i].segment.index] = $scope.radioGroup[i].recs;
			break;
		}
	}
	$scope.radioClick = function(radioButtonindex, radioGroupIndex) {
		var validSelection, decision;
		validSelection = $scope.validateRadioSelection(radioGroupIndex, $scope.radioGroup[radioButtonindex].recs);
		if (!validSelection) {
			decision = window.confirm("This timing is not compatible with other legs. Do you wish to change timings of other legs to make it compatible?");
			if (decision) {
				$scope.enforceSelection(radioGroupIndex, $scope.radioGroup[radioButtonindex].recs);
			} else {
				$scope.selectedRadioIndexRegistry[radioGroupIndex] = $scope.previousSelection;
			}
		} else {
			$scope.previousSelection = $scope.selectedRadioIndexRegistry[radioGroupIndex];
		}
		console.log("$scope.selectedRec.index = " + $scope.selectedRec.index);
	};
});