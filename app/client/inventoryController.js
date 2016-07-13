app.controller('InventoryController', function($scope, $rootScope, config) {
  $scope.items = [];
  $scope.$on('login', function(e, args) {
    updateItems(args.userInfo);
  });

  const socket = io.connect(config.siteUrl);
  socket.on('setUser', function(user) {
    if ($rootScope.name === user.name) {
      $scope.$apply(function() {
        updateItems(user);
      });
    }
  });

  $scope.auction = function(item) {
    $rootScope.$broadcast('auction', {
      name: item.name,
      maxQuantity: item.value,
      image: item.image
    });
    console.log('auction is broadcast');
  };

  /**
  * Updates the items
  * @param {object} user - user to update
  */
  function updateItems(user) {
    $scope.items = [];
    $scope.items.push({
      image: '/images/bread_icon.jpg',
      name: 'bread',
      value: user.breads
    });
    $scope.items.push({
      image: '/images/carrot_icon.png',
      name: 'carrot',
      value: user.carrots
    });
    $scope.items.push({
      image: '/images/diamond_icon.png',
      name: 'diamond',
      value: user.diamonds
    });
  }
});
