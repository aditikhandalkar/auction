const app = angular.module('app', ['timer']);
app.run(function($rootScope) {
  $rootScope.loggedIn = false;
});
