var http=require('http');
var url=require('url');
var fs=require('fs');
var querystring=require('querystring');
http.createServer(function (req, res) {
    var urlObj=url.parse(req.url,true);
    var pathname=urlObj.pathname;
    if(pathname=='/'){
        fs.readFile('./index.txt.txt.html','utf8',function (err,data) {
            res.end(data);
        })
    }else if(pathname=='/reg'){
        var result='';
        req.on('data',function (data) {
            result+=data;
        });
        req.on('end',function (data) {
            var obj=querystring.parse(result);
            console.log(obj);
            res.end("ok")
        });
    }
}).listen('8080');