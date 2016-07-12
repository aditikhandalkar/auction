app.controller('InventoryController', function($scope, $rootScope) {
  $scope.items = [];
  $scope.$on('login', function(e, args) {
    console.log('received event');
    $scope.items.push({
      image: '/images/bread_icon.jpg',
      name: 'bread',
      value: args.userInfo.breads
    });
    $scope.items.push({
      image: '/images/carrot_icon.png',
      name: 'carrot',
      value: args.userInfo.carrots
    });
    $scope.items.push({
      image: '/images/diamond_icon.png',
      name: 'diamond',
      value: args.userInfo.diamonds
    });
  });

  $scope.auction = function(item) {
    $rootScope.$broadcast('auction', {
      name: item.name,
      maxQuantity: item.value,
      image: item.image
    });
    console.log('auction is broadcast');
  }
});
