var express=require('express');
var app=express();

//中间件, 如果不写路径，就可以匹配所有路径
app.use('/money',function (req,res,next) {
    res.mny=100;
    next()
});

app.use('/money',function (req,res,next) {
    res.mny=res.mny-10;
    next()
});
//匹配不到链接就会跳过这个中间件
app.use('/hello',function (req,res,next) {
    res.mny=res.mny-10;
    next()
});
//发送补贴100
app.get('/money',function (req, res) {
    res.send(""+res.mny)
});
app.listen('8080');