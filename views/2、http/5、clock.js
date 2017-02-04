var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url');  //解析路径，把url转成url对象
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true); //解析url，参数设为true，query就转为对象，便于操作
    res.writeHead(200, {'content-Type': mime.lookup(req.url)+';charset=utf-8'});
    if (urlObj.pathname == '/') {
        fs.readFile('./clock.html', function (err, data) {
            res.end(data)
        })
    } else if (urlObj.pathname == '/clock') {
        res.end(new Date().toLocaleString())
    }

});

server.listen(8080, 'localhost');