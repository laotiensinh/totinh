'use strict';
//var http = require('http');
//var port = process.env.PORT || 1337;

//http.createServer(function (req, res) {
  //  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.end(index.html);
//}).listen(port);
var http = require('http');
var fs = require('fs');
var path = require('path');
//  w  w  w.j a  va  2s.co  m
function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: Resource not found.');
    response.end();
}

var mimeLookup = {
    '.js': 'application/javascript',
    '.html': 'text/html'
};

var server = http.createServer(function (req, res) {
    if (req.method == 'GET') {
        var fileurl;
        if (req.url == '/')
            fileurl = '/index.html';
        else
            fileurl = req.url;
        var filepath = path.resolve('./' + fileurl);

        var fileExt = path.extname(filepath);
        var mimeType = mimeLookup[fileExt];
        if (!mimeType) {
            send404(res);
            return;
        }
        fs.exists(filepath, function (exists) {
            if (!exists) {
                send404(res);
                return;
            };
            res.writeHead(200, { 'content-type': mimeType });
            fs.createReadStream(filepath).pipe(res);
        });
    } else {
        send404(res);
    }
}).listen(1337);

console.log('server running on port 1337'); 