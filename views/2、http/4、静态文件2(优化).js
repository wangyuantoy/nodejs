var fs = require("fs");
var http = require("http");
var path = require("path");
var mime = require("mime");
/*创建服务器并返回当前时间*/

var server = http.createServer(function (req, res) {
    var url = req.url;
    /*
     * 通过判断请求的url，确定返回的内容
     * 批量化处理，利用mime模块通过url确定mimeType*/
    res.setHeader("Content-Type", mime.lookup(url) + ";charset=utf-8");
    fs.readFile("." + url, "utf8", function (err, data) {
        res.write(data);
        res.end();
    })


});


server.listen(8080);
