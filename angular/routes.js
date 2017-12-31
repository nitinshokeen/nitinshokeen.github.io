app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl     : 'views/results.html',
            controller      : 'mainController',
            controllerAs    : 'matchData'
        })
        .when('/table',{
            templateUrl     : 'views/table.html',
            controller      : 'tableController',
            controllerAs    : 'tableData'
        })
        .when('/match/:round/:date/:team1/:team2/:score1/:score2',{

            templateUrl     : 'views/matchView.html',
            controller      : 'matchController',
            controllerAs    : 'matchView'
        })

        .otherwise(
            {
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);