var PORT = process.env.PORT || 5000;

var express = require('express');
var app = express();

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {

    }
    callback();
}

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function(){
    console.log('Listening on ' + PORT + '...');
})
