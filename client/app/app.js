var app = angular.module('app', ['ngRoute', 'lbServices']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '/app/users/login.html',
            isPublic: true
        })
        .when('/dashboard', {
            templateUrl: '/app/dashboard/settings.html'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

app.run(['$rootScope', 'Users', '$location', function ($rootScope, Users, $location) {
    if (localStorage.$LoopBack$currentUserId) {
        $rootScope.me = Users.findById({
            id: localStorage.$LoopBack$currentUserId
        });
    };
    
    $rootScope.$on('user:logout', function(){
        delete $rootScope.me;
        Users.logout();
    });
    
    $rootScope.$on('$routeChangeStart', function(event, next, current){
        if(!$rootScope.me && !next.isPublic){
            $location.path('/login');
        }
    });
}]);