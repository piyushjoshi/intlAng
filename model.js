/**
 * 
 */
var model = function() {
	var recs = [], exposedRecs = [], airlineInfo = {}, utils = {};

	utils.pushRec = function(rec) {
		model.utils.processFare(rec);
		model.utils.formatDuration(rec);
		model.utils.calculateStops(rec);
		rec.index = recs.length;
		recs.push(rec);
	};

	utils.groupRecs = function() {
		var groups = {}, k, order = [];
		exposedRecs.splice(0, exposedRecs.length);
		angular.forEach(recs, function(rec) {
			k = rec.refAirline[0].code + rec.totPricePerAdt;
			if (!groups[k]) {
				groups[k] = [];
			}
			groups[k].push(rec);
			if (order.indexOf(k) === -1) {
				order.push(k);
			}
		});
		angular.forEach(order, function(k) {
			exposedRecs.push(groups[k]);
		});
	};
	utils.pushAirlineInfo = function(code, info) {
		airlineInfo[code] = info;
	};

	modules.intlApp.run(function($http, $q) {
		$http.jsonp("http://localhost:8888?callback=JSON_CALLBACK").success(function(data) {
			angular.forEach(data[0].results, function(rec) {
				utils.pushRec(rec);
			});
			utils.groupRecs();
		});
		$http.get("airlineinfo_148.json").success(function(data) {
			angular.forEach(data, function(info, code) {
				info.smallLogo = "http://cheapfaresindia.makemytrip.com/international/img/international/airline-logos/" + info.smallLogo;
				utils.pushAirlineInfo(code, info);
			});
		});
	});

	return {
		getRecs : function() {
			return exposedRecs;
		},
		resetRecs : function() {
			utils.groupRecs();
		},
		getAirlineInfo : function() {
			return airlineInfo;
		},
		getRec : function(index) {
			return recs[index];
		}
	};
}();