var http = require("http");
/*创建服务器并返回当前时间*/
var server = http.createServer(function (req, res) {
    console.log(req.method); //请求方法 get or post
    console.log(req.url);   // 请求URL
    console.log(req.headers); //请求头
    //响应码、响应头一定要写在响应体前边
    res.statusCode = 200; // 设置相应码
    res.setHeader("Content-Type", "text/html;charset=utf-8"); //设置响应头
    res.write("hello"); //响应体

    res.end("over")
});


server.listen(8080);