import angular from 'angular';

const app = angular.module('app', []);
app.run(function($rootScope) {
  $rootScope.loggedIn = false;
});

export default app;
