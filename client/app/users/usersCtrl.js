app.controller('usersCtrl', ['$scope', '$rootScope', 'Users', '$location', function ($scope, $rootScope, Users, $location) {
    $scope.newUser = new Users();

    $scope.login = function () {
        $scope.newUser.$login().then(function (success) {
            $location.path('/dashboard');
            $rootScope.me = success.user;
        }, function (err) {
            if (err.status == 401) {
                $scope.error = "Username or password not valid.";
            } else {
                $scope.error = "Fatal error. Please check log.";
                console.log(err);
            };
            
            $rootScope.$broadcast('user:logout');
        });
    };
    
    $scope.logout = function(){
        $rootScope.$broadcast('user:logout');
        $location.path('/login');
    };
}]);