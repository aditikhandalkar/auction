const app = angular.module('app', []);
app.run(function($rootScope) {
  $rootScope.loggedIn = false;
});
