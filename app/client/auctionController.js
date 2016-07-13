app.controller('AuctionController', function($scope, $rootScope, $http, config) {

  $scope.auctionQueue = [];
  $scope.auctionRunning = false;
  $scope.timeRemaining = 90;
  $scope.disableBid = false;

  const socket = io.connect(config.siteUrl);

  $scope.$on('login', function(e, args) {
    $http({
      method: 'GET',
      url: `${config.siteUrl}/auction`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(res) {
      startAuction(res.data);
    });
  });

  socket.on('newAuction', function(auction) {
    $scope.$apply(function() {
      startAuction(auction);
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

  /**
  * starts an auction
  * @param {object} auction auction to start
  */
  function startAuction(auction) {
    $scope.auctionRunning = true;
    $scope.auction = auction;
    if ($rootScope.name === $scope.auction.sellerName) {
      $scope.disableBid = true;
    }
  }
});
