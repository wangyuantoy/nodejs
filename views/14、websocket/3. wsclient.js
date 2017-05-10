var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');
// 链接服务器成功后，执行回调

ws.on('open',function () {
    ws.send('hello server')
});
// 监听服务器发回来的消息
ws.on('message',function (data, flags) {
    console.log(data)
});
