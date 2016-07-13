app.controller('AuctionController', function($scope, $rootScope, $http, config) {

  $scope.auctionQueue = [];
  $scope.auctionRunning = false;
  $scope.timeRemaining = 90;
  $scope.disableBid = false;

  const socket = io.connect(config.siteUrl);

  socket.on('newAuction', function(auction) {
    $scope.$apply(function() {
      $scope.auctionRunning = true;
      $scope.auction = auction;
      if ($rootScope.name === $scope.auction.sellerName) {
        $scope.disableBid = true;
      }
    });
  });

  socket.on('setTime', function(data) {
    $scope.$apply(function() {
      $scope.timeRemaining = data.time;
      if ($scope.timeRemaining === 0) {
        $scope.auctionRunning = false;
      }
    });
  });

  socket.on('newBid', function(bid) {
    $scope.$apply(function() {
      $scope.auction.buyerName = bid.buyerName;
      $scope.auction.itemValue = bid.itemValue;
    });
  });

  $scope.bid = function() {
    if ($scope.coins > $scope.auction.itemValue) {
      $http({
        method: 'POST',
        url: `${config.siteUrl}/placeBid`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          id: $scope.auction.id,
          buyerName: $scope.name,
          itemValue: $scope.coins
        }
      });
    }
  };
});
