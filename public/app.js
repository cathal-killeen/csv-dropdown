var app = angular.module('csvDropdown', ['ui.bootstrap.datetimepicker'])

.controller('MainCtrl', function($scope, $http){
    var URL_ROOT = "http://159.122.211.137:8080";
    var nodes = ["403464038","403469181","408510454","408515365"];

    $scope.options = {
        metric: "",
        start: null,
        end: null
    }

    var crawlMetrics = function(){
        $http.get('/metrics')
            .then(function(res){
                console.log(res);
                $scope.metrics = res.data;
            }).catch(function(err){
                console.log(err);
            })
    }

    crawlMetrics();

    $scope.printDetails = function(){
        console.log($scope.options);
        console.log(moment($scope.options.start).unix());
    }

    $scope.downloadLink = function() {
        return URL_ROOT + '/render/?target=' + $scope.options.metric
                        + '&from=' + moment($scope.options.start).unix()
                        + '&until=' + moment($scope.options.end).unix()
                        + '&format=csv'
    }

})
