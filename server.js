var http = require('http');
var fs = require('fs');
var num = 0;
var path = require('path');
var currentPath = path.join(__dirname, 'server.html');
var file = 'log.txt';
var html = '';
fs.open(file, "r+", 0644, function(err, file_handle) {
	if (!err) {
    fs.readFile(file, function (err, contents) {
      num = Number(contents);
	})} else {
		  num = 1;
	}
});

var server = http.createServer(function(req, res) {
  fs.readFile('server.html', 'utf8', function(err, data){
    if(err){
       res.writeHead(404, {'Content-type':'text/plan'});
       res.write('Page Was Not Found');
       res.end( );
    }else{
       res.writeHead(200);

       //var num1 = document.getElementById('num1');

       //num1.innerHTML = html;
       fs.open(file, "w+", 0644, function(err, file_handle) {
       	if (!err) {
            fs.write(file_handle, num, null, 'ascii', function(err, written) {
              if (!err) {
                 console.log("Текст успешно записан в файл");

             } else {
                 console.log("Произошла ошибка при записи");
             }
         });
       	} else {
       		  num = 1;
       	}
       });
       html += '<h1>' + num + '</h1>';
       num += 0.5;
       res.write(data + html);
       res.end();
     }
  })
})

server.listen(3000);
