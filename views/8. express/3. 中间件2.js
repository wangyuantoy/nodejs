var express=require('express');
var app=express();
//计算一个处理请求共用了多长时间
/*
* 思路：每次中间件结束都默认调用一次res.end方法，从end上去记录结束时间
* 因为不知道访问的路径是哪个记录起始时间不传递路径，匹配所有
* */
app.use(function (req,res,next) {
    res.start=Date.now();
    //咱存原来的end方法
    var end=res.end;
    //把res.end重新赋值为自定义函数
    res.end=function () {
        //先把原来的end方法调用一次
        end.apply(res,Array.prototype.slice.call(arguments));
        //加入自己的逻辑，后续在调用res.end就是自定义的了
        console.log(Date.now()-res.start);
    };
    next()
});
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
app.use('/money',function (req,res,next) {
    res.mny=res.mny-10;
    next()
});
//发送补贴100
app.get('/money',function (req, res) {
    res.send(""+res.mny)
});
app.listen('9090');
