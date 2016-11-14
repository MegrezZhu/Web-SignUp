let http = require('http');
let router = require('./routes/router');

let port = 8000;

http.createServer(router)
    .listen(port, function() {
        console.log(`server listening at port ${port}`);
    });