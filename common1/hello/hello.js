angular.module('hello', [])

.directive('helloWorld', function() {
	return {
		templateUrl: 'common1/hello/hello.tpl.html'
	};
});
