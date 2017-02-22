var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var querystring = require('querystring');
var mime = require('mime');
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        fs.readFile('./index.html', 'utf8', function (err, data) {
            res.end(data);
        })
    } else if (pathname == '/reg2') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            fs.readFile(files.avatar.path, function (err, data) {
                var filename = '/images/' + files.avatar.name;
                fs.writeFile('.' + filename, data, function (err) {
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.end(filename)
                })
            });
        });
    } else {
        fs.exists('.' + pathname, function (exists) {
            if (exists) {
                res.setHeader('Content-Type', mime.lookup(pathname));
                fs.readFile('.' + pathname, function (err, data) {
                    res.end(data);
                })
            } else {
                res.statusCode = 404;
                res.end('404')
            }
        })
    }
}).listen('8080');