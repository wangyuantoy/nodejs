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

io.on('connection',function (socket) {
    //socket 代表与某个客户端的链接对象
    socket.on('message',function (msg) {
        socket.send('server:' + msg)
    })
});

server.listen(8080);