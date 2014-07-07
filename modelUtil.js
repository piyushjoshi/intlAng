/**
 * 
 */
model.utils = {};
model.utils.processFare = function(rec) {
	var t = 0, d = 0, paxFares = rec.paxFares, paxFare, fares, fare, fareType, i, j;
	for (i = 0; i < paxFares.length; i++) {
		paxFare = paxFares[i];
		if (paxFare.paxType == 'ADT') {
			fares = paxFare.fares;
			for (j = 0; j < fares.length; j++) {
				fare = fares[j];
				fareType = fare.fareType;
				if (fareType == 'TOT') {
					t = t + fare.fare;
				} else if (fareType == 'GST') {
					t = t + fare.fare;
				} else if (/^MUTAX.*/.test(fareType)) {
					t = t + fare.fare;
				} else if (/^MU.*/.test(fareType)) {
					t = t + fare.fare;
				} else if (/^DIS.*/.test(fareType)) {
					t = t - fare.fare;
					d += fare.fare;
				}
			}
		}
	}
	rec.totPricePerAdt = Math.floor(t + 0.5);
	rec.totDiscountPerAdt = Math.floor(d + 0.5);
};
model.utils.formatDuration = function(rec) {
	var mins, hrs, str;
	angular.forEach(rec.segments, function(seg) {
		mins = seg.duration % 60;
		hrs = (seg.duration - mins) / 60;
		str = (hrs + "h");
		if (mins > 0) {
			str += (" " + mins + "m");
		}
		seg.durationFormatted = str;
	});
};
model.utils.calculateStops = function(rec) {
	var maxStops = 0;
	angular.forEach(rec.segments, function(seg) {
		var techStopCount = 0;
		angular.forEach(seg.groupOfFlights, function(flight) {
			if (flight.techStopOver) {
				techStopCount += flight.techStopOver.length;
			}
		});
		seg.noOfStops = techStopCount + seg.groupOfFlights.length - 1;
		if (maxStops < seg.noOfStops) {
			maxStops = seg.noOfStops;
		}
	});
	rec.noOfStops = maxStops;
};