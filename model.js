/**
 * 
 */
var model = function() {
	var recs = [];
	var airlineInfo = {};
	return {
		pushRec : function(rec) {
			rec.totPricePerAdt = model.utils.getPricePerAdult(rec);
			recs.push(rec);
		},
		getRecs : function() {
			return recs;
		},
		pushAirlineInfo : function(code, info) {
			airlineInfo[code] = info;
		},
		getAirlineInfo : function() {
			return airlineInfo;
		}
	};
}();
modules.intlApp.run(function($http) {
	$http.get("recs41.json").success(function(data) {
		angular.forEach(data[0].results, function(rec) {
			model.pushRec(rec);
		});
	});
	$http.get("airlineinfo.json").success(function(data) {
		angular.forEach(data, function(info, code) {
			info.smallLogo = "http://cheapfaresindia.makemytrip.com/international/img/international/airline-logos/" + info.smallLogo;
			model.pushAirlineInfo(code, info);
		});
	});
});