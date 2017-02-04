var fs = require("fs");
var http = require("http");
/*创建服务器并返回当前时间*/
var server = http.createServer(function (req, res) {
    var url = req.url;
    //通过判断请求的url，确定返回的内容
    if (url == "/index.html") {
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        fs.readFile("./index.html", "utf8", function (err, data) {
            res.write(data);
            res.end();
        })
    } else if (url == "/style.css") {
        res.setHeader("Content-Type", "text/css;charset=utf-8");
        fs.readFile("./style.css", "utf8", function (err, data) {
            res.write(data);
            res.end();
        })
    }


});


server.listen(8080);