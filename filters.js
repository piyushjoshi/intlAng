/**
 * 
 */
modules.intlApp.filter("currencyWithoutDecimal", function() {
	return function(value) {
		return value.replace(/\.\d+/, "");
	};
});

modules.intlApp.filter("stopsDisplay", function() {
	return function(value) {
		value = +value;
		return value === 0 ? "Non stop" : value === 1 ? "1 stop" : value + " stops";
	};
});
