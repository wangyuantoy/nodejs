/**
 * cookie是有http在响应头header里发送到浏览器，设置cookie用Set-Cookie
 * 客户端向服务器发送请求时cookie在请求头里发送给服务端
 */
/**
 * 设置cookie两种方法
 * 1. res.wirteHead(200,{'Set-Cookie':'name=aaa; path=/; Expire=xxx'});
 * 缺点：只能发送一次头部，且不能与res.render共存，否则报错
 * 2. res.setHeader('Set-Cookie','name=aaa; path=/; Expire=xxx');
 */

var http=require('http');
http.createServer(function (req, res) {
    if(req.url=='/write'){
        //响应头  实体头  扩展头自定义
        res.setHeader('Set-Cookie','name=aaa');
        res.end('ok')
    }else if (req.url=='/read'){
        //获取浏览器发送过来的cookie
        console.log(req.headers)
        res.end(req.headers.cookie)
    }
}).listen(8080);
