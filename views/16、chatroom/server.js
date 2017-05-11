var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.get('/',function (req,res) {
    res.sendfile('./index.html')
});

// 创建HTTP服务器   socket.io需要借助HTTP服务器实现
var server = require('http').createServer(app);
// 创建socket.io服务器
var io = require('socket.io')(server);
var clients = [];
io.on('connection',function (socket) {
    // 把所有人的socket存放到clients
    clients.push(socket);
    //socket 代表与某个客户端的链接对象
    socket.on('message',function (msg) {
        // 客户端发过来的消息发给所有人
        clients.forEach(function (client) {
            client.send(msg)
        })
    })
});

server.listen(8080);