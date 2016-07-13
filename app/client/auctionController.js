app.controller('AuctionController', function($scope, $rootScope, $http, config) {

  $scope.auctionQueue = [];
  $scope.auctionRunning = false;
  $scope.winningBid = 0;
  $scope.timeRemaining = 90;

  const socket = io.connect(config.siteUrl);

  socket.on('newAuction', function(auction) {
    if ($scope.auctionRunning) {
      $scope.auctionQueue.push(auction);
    } else {
      startAuction(auction);
    }
  });

  socket.on('setTime', function(data) {
    $scope.$apply(function() {
      $scope.timeRemaining = data.time;
      if ($scope.timeRemaining === 0) {
        $scope.auctionRunning = false;
      }
    });
  });

  $scope.bid = function() {
    if ($scope.coins > $scope.winningBid) {
      $scope.winningBid = $scope.coins;
      $scope.auction.buyerName = $scope.name;
      $scope.auction.itemValue = $scope.coins;
      $http({
        method: 'POST',
        url: `${config.siteUrl}/placeBid`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: $scope.auction
      });
    }
  };

  /**
  * Starts an auction.
  * @param {object} auction - Auction to start
  */
  function startAuction(auction) {
    console.log('starting an auction');
    $scope.winningBid = 0;
    $scope.auctionRunning = true;
    $scope.auction = auction;
    // $rootScope.$broadcast('timer-start');
  }
});
