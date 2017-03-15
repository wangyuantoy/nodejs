//express 中使用cookie需要用到cookie-parser中间件
var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();

app.use(cookieParser());
app.get('/',function (req, res) {
    /**需求
     * 如果请求中的cookie存在visited则输出cookie
     * 否则，设置cookie字段visited，并设置过期时间为xxx
     */
    if(req.cookies.visited){
        res.send('welcome old friend')
    }else{
        //cookie是cookieParser添加给res的属性
        res.cookie('visited',1,{maxAge:6*1000});
        res.send('welcome new friend')
    }
});

app.listen(8080);