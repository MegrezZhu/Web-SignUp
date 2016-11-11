var http = require('http');
var router = require('./routes/router');

var port = 8000;

http.createServer(router)
    .listen(port, function() {
        console.log(`server listening at port ${port}`);
    });