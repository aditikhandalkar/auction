import app from '../app';
import io from 'socket.io-client';

export default class UserController {
  static startup() {
    app.controller('UserController', function($scope, $rootScope, config) {
      $scope.$on('login', function(e, args) {
        console.log('received event');
        $scope.name = args.userInfo.name;
        $scope.coins = args.userInfo.coins;
      });

      const socket = io.connect(config.siteUrl);
      socket.on('setUser', function(user) {
        if ($scope.name === user.name) {
          $scope.$apply(function() {
            $scope.coins = user.coins;
          });
        }
      });
    });
  }
}
