app.controller('LoginController', function($scope, $rootScope) {
  $scope.login = function() {
    console.log('handling login event');
    $rootScope.loggedIn = true;
    $rootScope.name = $scope.name;
    $rootScope.maxCoins = 1000;
    $rootScope.$broadcast('login', {
      userInfo: {
        name: $scope.name,
        coins: 1000,
        breads: 30,
        carrots: 18,
        diamonds: 1
      }
    });
    console.log('emitted login event');
  };
});
