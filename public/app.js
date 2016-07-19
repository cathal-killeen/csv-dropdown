var app = angular.module('csvDropdown', ['ui.bootstrap.datetimepicker'])

.controller('MainCtrl', function($scope, $http, $timeout){
    var URL_ROOT = "http://159.122.211.137:8080";
    var nodes = ["403464038","403469181","408510454","408515365"];

    $scope.options = {
        metric: [],
        start: null,
        end: null,
        metrics: function(){
            var string = ""
            var arr = $scope.options.metric;
            for(var i=0; i < arr.length; i++){
                if(i>0){
                    string += '&target=';
                }
                string += arr[i].childNodes[0].nodeValue;
            }
            return string;
        }
    }

    var crawlMetrics = function(){
        $http.get('/metrics')
            .then(function(res){
                console.log(res);
                $scope.metrics = res.data;
                $timeout(function () {
                    $(document).ready(function() {
                        $('#metrics').multiselect({
                            includeSelectAllOption: true,
                            enableClickableOptGroups: true,
                            onChange: function(option, checked) {
                                // Get selected options.
                                var selectedOptions = $('#metrics option:selected');
                                console.log(selectedOptions);
                                $scope.options.metric = selectedOptions;
                            }
                        });
                    });
                }, 500);
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
        return URL_ROOT + '/render/?target=' + $scope.options.metrics()
                        + '&from=' + moment($scope.options.start).unix()
                        + '&until=' + moment($scope.options.end).unix()
                        + '&format=csv'
    }

})
