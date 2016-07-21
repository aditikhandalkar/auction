import app from '../app';

export default class LoginController {
  static startup() {
    app.controller('LoginController', function($scope, $rootScope, $http, config) {
      $scope.login = function() {
        console.log('handling login event');
        $rootScope.loggedIn = true;
        $rootScope.name = $scope.name;
        $http({
          method: 'POST',
          url: `${config.siteUrl}/login`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {name: $scope.name}
        })
        .then(res => {
          if (res.data.isError) {
            alert(`Could not login: ${res.data.message}`);
          } else {
            const user = res.data.user;
            $rootScope.maxCoins = user.coins;
            $rootScope.$broadcast('login', {
              userInfo: user
            });
            console.log('emitted login event');
          }
        })
        .catch(res => {
          alert('Could not login');
        });
      };
    });
  }
}
