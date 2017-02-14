var http = require('http');
var url = require('url');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    if (pathname == '/books.html') {
        res.end(query.callback + '(["html","css"])')
    }
}).listen('8080');