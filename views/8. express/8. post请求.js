var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var app=express();
/*以注册为例*/
//当访问根目录时，'/'代表当前文件夹，http://localhost:8080/8. reg.html
app.use(express.static(path.resolve(__dirname)));
//extended为true时，用querystring转换为对象，false是用bodyPaerser自己的方法转换
app.use(bodyParser.urlencoded({extended:true})); //此中间件会把请求体提取出来转成对象放在req.body上
//app.use(bodyParser.json({extended:true}));  //bodyParser的第二种数据格式
app.post('/reg',function (req,res){
    console.log(req.body);
    res.end('reg')
});
app.listen(8080);