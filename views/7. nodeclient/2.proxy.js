//跨域资源共享，用index.html localhost:63342能获取到8080的内容
var http = require('http');
var fs = require('fs');
var bodyParser = require('./2.bodyParser');
var proxy = require('./2.request');
var user = [];
var server = http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.createReadStream('./2.index.html').pipe(res);
    } else if (req.url == '/reg') {
        //1. 获取请求里的请求体
        //2. 构建一个指向8080的请求，把请求体传递过去
        //3. 得到8080的响应，然后传回给客户端
        bodyParser(req, function (result) {
            proxy({
                host: 'localhost',
                port: 8080,
                path: '/',
                method: 'POST',
                data: result
            }, result, function (response) {
                res.end(response)
            })
        })
    }
}).listen('9090');

