app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/results.html',
        	// Which controller it should use 
            controller 		: 'mainController',
            // what is the alias of that controller.
        	controllerAs 	: 'matchData'
        })
        .when('/create',{
        	templateUrl     : 'views/create-view.html',
        	controller 		: 'blogCreateController',
        	controllerAs 	: 'currentBlog'
        })
        .when('/blog/:blogId',{

        	templateUrl     : 'views/blog-view.html',
        	controller 		: 'singleBlogController',
        	controllerAs 	: 'singleBlog'
        })

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);