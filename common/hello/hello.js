angular.module('hello', [])

.directive('helloWorld', function() {
	return {
		templateUrl: 'hello/hello.tpl.html'
	};
});
