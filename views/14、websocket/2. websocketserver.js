var Server = require('ws').Server;
// 创建服务器实例
var wss = new Server({
    port:8080
});
// 监听客服端请求，有连接时执行回调
wss.on('connection',function (ws) {
    // 监听客户端发送的数据
    ws.on('message',function (message) {
        console.log('服务器收到:%s',message);
        ws.send('服务器回复：' + message)
    })

});


