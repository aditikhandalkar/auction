app.controller('AuctionController', function($scope, $rootScope) {

  $scope.auctionQueue = [];
  $scope.auctionRunning = false;
  $scope.winningBid = 0;
  $scope.timeRemaining = 90;

  $scope.$on('startAuction', function(e, args) {
    const auction = {
      sellerName: $rootScope.name,
      itemName: args.itemName,
      image: args.image,
      quantity: args.quantity
    };
    if ($scope.auctionRunning) {
      $scope.auctionQueue.push(auction);
    } else {
      startAuction(auction);
    }
  });

  $scope.bid = function() {
    if ($scope.coins > $scope.winningBid) {
      $scope.winningBid = $scope.coins;
      if ($scope.timeRemaining < 10) {
        $scope.timeRemaining += 10;
        $rootScope.$broadcast('timer-set-countdown', $scope.timeRemaining);
      }
    }
  };

  $scope.$on('timer-tick', function(event, data) {
    $scope.timeRemaining -= 1;
  });

  $scope.$on('timer-stopped', function(event, data) {
    console.log('timer-stopped');
    $scope.$apply(function() {
      $scope.auctionRunning = false;
      if ($scope.auctionQueue.length > 0) {
        const removedArray = $scope.auctionQueue.splice(0, 1);
        startAuction(removedArray[0]);
      }
    });
  });

  /**
 * Starts an auction.
 * @param {object} auction Auction to start.
 */
  function startAuction(auction) {
    console.log('starting an auction');
    $scope.winningBid = 0;
    $scope.timeRemaining = 90;
    $scope.auctionRunning = true;
    $scope.auction = auction;
    $rootScope.$broadcast('timer-start');
  }
});
