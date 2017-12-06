
var app = angular.module('englishPremierLeague', ['ngRoute']);

app.controller('mainController',['$http',function($http){
	var main = this;
	this.matches = [];
	this.sortBy = "";
	this.reverse = false;
	this.sortItems = function(key){
		 if (this.sortBy === key) {
            this.sortBy = '-' + key;
        } else if (this.sortBy === '-' + key) {
            this.sortBy = key;
        } else {
            this.sortBy = key;
        }
        this.reverse = !this.reverse;
	};
	this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
	this.loadAllMatches = function(){
		$http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response.data);
          main.matches = response.data;
          main.sort = response.data.rounds[0].matches[0].date;
          console.log(response.data.rounds[0].matches[0].date);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });
	}
	this.loadAllMatches();

}]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "angular/results.html"
  })
  .when("/red", {
    templateUrl : "red.htm"
  })
  .when("/green", {
    templateUrl : "green.htm"
  })
  .when("/blue", {
    templateUrl : "blue.htm"
  });
});