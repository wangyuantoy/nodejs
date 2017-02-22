var express=require('express');
//获取配置对象
var app=express();
//配置路由。当用户访问/时，会执行回调函数
app.get('/',function (req, res) {
    //send可以自动判断参数类型，自动转换相应信息，并且自动设置Content-Type
    res.send('home')
});
app.get('/hello',function (req, res) {
    //send可以自动判断参数类型，自动转换相应信息，并且自动设置Content-Type
    res.send('hello')
});
//对所有的请求类型都有效（get post put delete）
app.all('/hello',function (req, res) {
    res.send('all hello')
});
//启动服务器
app.listen(3000);