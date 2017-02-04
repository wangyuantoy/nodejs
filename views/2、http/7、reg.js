var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url');  //解析路径，把url转成url对象
var users=[];
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true); //解析url，参数设为true，query就转为对象，便于操作

    if (urlObj.pathname == '/') {
        res.writeHead(200, {'content-Type':'text/html;charset=utf-8'});
        fs.readFile('./reg.html', function (err, data) {

            res.end(data)
        })
    } else if (urlObj.pathname == '/reg') {
        // 用户有可能发送特别大的数据，数据会分段接收到，每当服务器收到一段客户端发过来的数据时候就会触发data事件；把接收到的数据拼接起来，接收完成后触发end事件
        var str='';
        req.on('data',function (data) {
            //接收到的数据是buffer类型，转换为字符串
            str+=data.toString();
        });
        // 所有数据接收完毕，请求体的数据就接收完整了
        req.on('end',function () {
            // 转成对象追加到用户列表里,替换原来的数组
            users.splice(0,users.length,JSON.parse(str));
            //返回用户列表
            res.end(JSON.stringify(users))
        })
    }

});

server.listen(8080, 'localhost');