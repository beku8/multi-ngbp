angular.module('hello', [])

.directive('helloWorld', function() {
	return {
		template: 'Hello world!!!'
	};
});
