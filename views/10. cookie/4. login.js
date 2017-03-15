var express=require('express');
var cookieParser=require('cookie-parser');
var path=require('path');
var app=express();

app.set('view engine','ejs');
app.set('views',path.resolve());
app.use(cookieParser());
/**需求
 * 用cookie设置登录页面
 */
//此中间件是判断是否是登录状态，如果未登录跳回登陆页面
function checkLogin(req, res, next) {
    if(req.cookies&&req.cookies.username){
        next();
    }else{
        res.redirect('/')
    }
}
//进入登陆页
app.get('/',function (req,res) {
    res.render('4. login.ejs',{})
});

//登录
app.get('/login',function (req,res) {
    console.log(req.query);
    var username=req.query.username;
    res.cookie('username',username);
    res.redirect('/user'); //重定向，让客户端重新想新请求参数指定的路径
    res.send()
});
//用户主页
app.get('/user',checkLogin,function (req,res) {
    //checkLogin中间件如果是true执行next(),也就是执行此函数
    res.send(req.cookies.username);
});
app.listen(8080);