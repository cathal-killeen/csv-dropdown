var PORT = process.env.PORT || 5000;

var express = require('express');
var app = express();

var request = require('request');

app.use(express.static(__dirname + '/public'));

app.get('/metrics', function(req, res){
    var nodes = ["403464038","403469181","408510454","408515365"];
    request('http://159.122.211.137:8080/metrics/index.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var array = [];
            body = JSON.parse(body);
            body.forEach(function(metric){
                nodes.forEach(function(node){
                    if(metric.indexOf(node) > -1){
                        array.push(metric);
                    }
                })
            })
            res.status(200).send(array);
        }else{
            res.status(500).send(error);
        }
    })
})

app.listen(PORT, function(){
    console.log('Listening on ' + PORT + '...');
})
