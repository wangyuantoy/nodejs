var http = require("http");
/*创建服务器并返回当前时间*/
var server = http.createServer(function (req, res) {
    var time=new Date();
    //设置内容类型，防止浏览器解析乱码
    res.setHeader("Content-Type","text/html;charset=utf-8");
    //返回的信息只能是字符串或者buffer对象
    res.write(time.toString());
    res.end();
});


server.listen(8080);