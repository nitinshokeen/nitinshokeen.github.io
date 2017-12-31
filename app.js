var app = angular.module('englishPremierLeague', ['ngRoute']);

app.controller('mainController', ['$http', function($http) {
    var main = this;
    this.matches = [];
    this.date = "";
    //function to check duplicate date
    this.dateChecker = function(date) {
        if (date === this.date) {
            date = "";
        } else {
            this.date = date;
        }
        return date;
    };//end dateChecker
    this.baseUrl2015 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
    this.baseUrl2016 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
    //function to 'GET' json data by providing a url
    this.loadAllMatches = function(url) {
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response.data);
            main.matches[main.matches.length] = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("some error occurred. Check the console.");
            console.log(response);
        });
    }//end loadAllMAtches
    this.loadAllMatches(this.baseUrl2015);
    this.loadAllMatches(this.baseUrl2016);
    //function for filtering score
    this.scoreFilter = function(score) {
        if (score == undefined) return;
        else {
            return function(match) {
                return match.score1 == score || match.score2 == score;
            }
        }
    };//end scoreFilter
}]);//end mainController


app.controller('tableController', ['$http', function($http) {
    var main = this;
    this.baseUrl2015 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
    this.baseUrl2016 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
    //function to 'GET' json data by providing a url
    this.loadAllMatches = function(url) {
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            main.loadTableData(response.data);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("some error occurred. Check the console.");
            console.log(response);
        });
    }//end laoldAllMatches
    //function to set season for table
    this.setSeason = function(season) {
        if (season == "2015/16") {
            this.reset();
            this.loadAllMatches(this.baseUrl2015);
        }
        if (season == "2016/17") {
            this.reset();
            this.loadAllMatches(this.baseUrl2016);
        }
    };//end setSeason
    //declaring arrays for storing teams stats
    this.teamNames = [];
    this.teamTotalPlayed = new Array(23).fill(0);
    this.teamWon = new Array(23).fill(0);
    this.teamLost = new Array(23).fill(0);
    this.teamDraw = new Array(23).fill(0);
    this.teamGoals = new Array(23).fill(0);
    //function to get all teams stats
    this.loadTableData = function(data) {
        console.log("loading table data...");
        for (var i = 0; i < data.rounds.length; i++) {
            for (var j = 0; j < data.rounds[i].matches.length; j++) {
                this.teamNames[this.teamNames.length] = data.rounds[i].matches[j].team1.name;
                this.teamNames = [...new Set(this.teamNames)];
                for (var k = 0; k < this.teamNames.length; k++) {
                    if (this.teamNames[k] === data.rounds[i].matches[j].team1.name) {
                        this.teamTotalPlayed[k] = this.teamTotalPlayed[k] + 1;
                        this.teamGoals[k] = this.teamGoals[k] + data.rounds[i].matches[j].score1;
                        if (data.rounds[i].matches[j].score1 > data.rounds[i].matches[j].score2) {
                            this.teamWon[k] = this.teamWon[k] + 1;
                        }
                        if (data.rounds[i].matches[j].score1 < data.rounds[i].matches[j].score2) {
                            this.teamLost[k] = this.teamLost[k] + 1;
                        }
                        if (data.rounds[i].matches[j].score1 === data.rounds[i].matches[j].score2) {
                            this.teamDraw[k] = this.teamDraw[k] + 1;
                        }
                    } else {
                        if (this.teamNames[k] === data.rounds[i].matches[j].team2.name) {
                            this.teamTotalPlayed[k] = this.teamTotalPlayed[k] + 1;
                            this.teamGoals[k] = this.teamGoals[k] + data.rounds[i].matches[j].score2;
                            if (data.rounds[i].matches[j].score2 > data.rounds[i].matches[j].score1) {
                                this.teamWon[k] = this.teamWon[k] + 1;
                            }
                            if (data.rounds[i].matches[j].score2 < data.rounds[i].matches[j].score1) {
                                this.teamLost[k] = this.teamLost[k] + 1;
                            }
                            if (data.rounds[i].matches[j].score1 === data.rounds[i].matches[j].score2) {
                                this.teamDraw[k] = this.teamDraw[k] + 1;
                            }
                        }//end else
                    }//end loop 3
                }//end for loop 2

            }//end for loop 1
        }
        this.teamNames = [...new Set(this.teamNames)];//keeping only unique names
    };//end loadTableData function
    //function to reset all team stats arrays
    this.reset = function() {
        this.teamNames = new Array(0);
        this.teamTotalPlayed = new Array(23).fill(0);
        this.teamWon = new Array(23).fill(0);
        this.teamLost = new Array(23).fill(0);
        this.teamDraw = new Array(23).fill(0);
        this.teamGoals = new Array(23).fill(0);
    };

}]);//end tableController

app.controller('matchController', ['$routeParams', function($routeParams) {
    this.date = $routeParams.date;
    this.round = $routeParams.round;
    this.team1 = $routeParams.team1;
    this.team2 = $routeParams.team2;
    this.score1 = $routeParams.score1;
    this.score2 = $routeParams.score2;
}]);