/**
 * 
 */
model.utils = {};
model.utils.getPricePerAdult = function(rec) {
	var t = 0;
	var paxFares = rec.paxFares;
	for (var i = 0; i < paxFares.length; i++) {
		var paxFare = paxFares[i];
		if (paxFare.paxType == 'ADT') {
			var fares = paxFare.fares;
			for (var j = 0; j < fares.length; j++) {
				var fare = fares[j];
				var fareType = fare.fareType;
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
				}
			}
		}
	}
	return t * 1;
};