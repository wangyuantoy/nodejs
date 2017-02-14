/*
* 代理跨域
* 2.index.html访问localhost:9090
* 2.proxy是代理服务器，接收到访问请求后发送请求体给2.trueserver
* 2.trueserver把数据返回给proxy
* proxy把数据返回给客户端
* */
var http = require('http');
var fs = require('fs');
var user = [];
var server = http.createServer(function (req, res) {
   var result='';
    req.on('data',function (data) {
        result+=data;
    });
    req.on('end',function () {
        user.push(JSON.parse(result));
        res.end(JSON.stringify(user))
    })
}).listen('8080');

