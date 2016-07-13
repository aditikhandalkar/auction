app.controller('AuctionDialogController', function($scope, $rootScope, $http, config) {
  $scope.$on('auction', function(e, args) {
    $scope.itemName = args.name;
    $scope.maxQuantity = args.maxQuantity;
    $scope.image = args.image;
    $scope.showDialog = true;
  });

  $scope.startAuction = function() {
    $scope.showDialog = false;
    const auction = {
      sellerName: $rootScope.name,
      itemName: $scope.itemName,
      itemImage: $scope.image,
      itemQuantity: $scope.quantity,
      buyerName: '',
      itemValue: 0
    };
    $http({
      method: 'POST',
      url: `${config.siteUrl}/queueAuction`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: auction
    })
    .then(function(res) {
      auction.id = res.data.id;
      $rootScope.$broadcast('startAuction', {auction: auction});
    });
  };

  $scope.cancel = function() {
    $scope.showDialog = false;
  };
});
