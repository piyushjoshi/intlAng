/**
 * 
 */
modules.intlApp.filter("currencyWithoutDecimal", function() {
	return function(value) {
		return value.replace(/\.\d+/, "");
	};
});