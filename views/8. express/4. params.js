var express=require('express');
var app=express();

/*获取请求参数
* req.host  返回请求头里的主机名(不包含端口号)
* req.path  返回请求的URL的路径名
* req.query 可获取客户端get请求查询字符串转成的对象，默认{}
* req.params    是一个由路径参数组成的对象
* */
// app.get('/',function (req,res) {
//     res.send('欢迎来到首页')
// });
app.get('/p',function (req,res) {
    console.log(req.host);
    console.log(req.path);
    console.log(req.query);
    res.send('欢迎来到首页')
});
//路径参数 把向服务器端传递的参数放在路径里
//eg. http://localhost:8080/user/1/30
app.get('/user/:id/:age',function (req,res) {
    console.log(req.params.id);
    console.log(req.params.age);
    res.send('欢迎来到user')
});

app.listen('8080');