var express=require('express');
var path=require('path');
var app=express();
/**
 * 静态文件服务中间件
 * express.static是express内置的唯一一个中间件，负责托管express引用内的静态资源
 * 项目目录下添加一个public文件夹存放静态文件(CSS,JS,IMG)
 * 浏览器发出文件请求是，服务器会到这个目录下寻找相关文件
 * app.use(express.static(path.join(__dirname,'public')),{options});
 */

app.use(express.static(path.resolve(__dirname+'/public')));
app.listen('8080');

//express.static的原理
// app.use(function (req, res, next) {
//     fs.createReadStream(__dirname+'/public'+req.url).pipe(res)
// });