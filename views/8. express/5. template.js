var express=require('express');
var path=require('path');
var app=express();
/*
* 1. 动态内容 eg.时间
* 2. 静态内容 eg.tmpl.html
* 3. 动静结合
* */
//配置属性值，需要npm安装ejs
// EJS是一个JavaScript模板库，用来从JSON数据中生成HTML字符串。类似handlebar
//使用模板的步骤
//1. 指定模板渲染引擎
app.set('view engine','ejs');
//2. 设置放模板文件的路径
app.set('views',path.join(__dirname,'views'));
//或者app.set('views',process.cwd()+'/views');
//3. render函数，对网页模板进行渲染
app.get('/',function (req,res) {
    //render是express的属性
    /**
     * 第一个参数是模板目录
     * 第二个参数是需要替换的内容
     */
    res.render('index',{title:'首页'})
});
app.get('/reg',function (req,res) {
    res.render('index',{title:'注册'})
});
app.listen('8080');
