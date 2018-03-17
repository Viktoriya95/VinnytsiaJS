var http = require('http');
var num = 1;

var server = http.createServer(function(req, res) {
res.writeHead(200, { 'Content-Type': 'text/html' });
res.write("You visited this site "  + num + " moments.");
num += 0.5;
res.end();
});

server.listen(3000);