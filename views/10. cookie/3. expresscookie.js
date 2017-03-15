//express 中使用cookie需要用到cookie-parser中间件
var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();

app.use(cookieParser());
app.get('/write',function (req, res) {
    //默认设置
    res.cookie('name','toy1');
    //设置域名,只有再次访问指定域名的时候客户端才向服务器发送cookie
    res.cookie('name','toy2',{
        domain:'a.toy.cn'  //配置host ‘127.0.0.1 a.toy.cn’
    });
    //指定路径，只有偶下次客户端向服务器发送请求是，如果path=/read1的时候才会向服务器发送
    res.cookie('name','toy3',{
        path:'/read1'
    });
    res.end('ok')
});
app.get('/read1',function (req,res) {
    console.log(req.cookies);
    res.send(req.cookies)
});
app.get('/read2',function (req,res) {
    console.log(req.cookies);
    res.send(req.cookies)
});
app.listen(8080);