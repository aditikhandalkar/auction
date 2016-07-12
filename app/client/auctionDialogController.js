app.controller('AuctionDialogController', function($scope, $rootScope) {
  $scope.$on('auction', function(e, args) {
    $scope.itemName = args.name;
    $scope.maxQuantity = args.maxQuantity;
    $scope.image = args.image;
    $scope.showDialog = true;
  });

  $scope.startAuction = function() {
    $scope.showDialog = false;
    $rootScope.$broadcast('startAuction', {
      itemName: $scope.itemName,
      quantity: $scope.quantity,
      image: $scope.image
    });
  };

  $scope.cancel = function() {
    $scope.showDialog = false;
  };
});
