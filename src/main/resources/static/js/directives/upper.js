app.directive('uppercased', function() {
	return {
		require : 'ngModel',
		link : function(scope, element, attrs, modelo) {
			modelo.$parsers.push(function(input) {
				return input ? input.toUpperCase() : "";
			});

		}
	};
});