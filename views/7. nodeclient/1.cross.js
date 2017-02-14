//跨域资源共享，用index.html localhost:63342能获取到8080的内容
var http = require('http');
var fs = require('fs');
var url = require('url');
var user = [];
var server = http.createServer(function (req, res) {
    var result = '';
    req.on('data', function (data) {
        result += data;
    });
    req.on('end', function () {
        user.push(JSON.parse(result));
        //设置响应头，允许哪个来源访问此服务器。跨域资源共享必须设置，如果value值设置为‘*’就是允许任何源请求本服务器
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
        res.end(JSON.stringify(user))
    });
}).listen('8080');

