app.controller('UserController', function($scope, $rootScope) {
  $scope.$on('login', function(e, args) {
    console.log('received event');
    $scope.name = args.userInfo.name;
    $scope.coins = args.userInfo.coins;
  });
});
