var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url');  //解析路径，把url转成url对象
var server = http.createServer(function (req, res) {
    var urlObj=url.parse(req.url,true); //解析url，参数设为true，query就转为对象，便于操作
    console.log(urlObj);
    res.writeHead(200,{'content-Type':'text/html;charset=utf-8'});
    if(urlObj.pathname == '/apple'){
        res.end("pingguo")
    }

});

server.listen(8080, 'localhost');