var express = require('express');
var session = require('express-session');
var app = express();
// session会给req添加session属性
app.use(session({
    secret: 'toy',   //secret值最好使用随机字符串，用这个规则进行加密设置的session值
    cookie: {maxAge: 60 * 1000 * 30},
    resave: true,   //每次响应结束都重新保存session
    saveUninitialized: true //保存新创建但未修改的session
}));
//第一次访问Response-Header里set-cookie:connect.sid=s%3AnYhS6fRBHLMUKxR_Sv9gzlO7HbIXMNft.kh%2FkWNQAoLTgu72pagfa0On%2B9WhUehPpfyRzRg7TvRU; Path=/; Expires=Tue, 28 Feb 2017 09:58:28 GMT; HttpOnly
//第二次访问Request-Header里发送connect.sid=s%3AnYhS6fRBHLMUKxR_Sv9gzlO7HbIXMNft.kh%2FkWNQAoLTgu72pagfa0On%2B9WhUehPpfyRzRg7TvRU
app.get('/', function (req, res) {
    if (req.session.sign) {   //检查是否已经登录
        res.send('welcome <strong>'+req.session.name+' </strong>login again')
    } else {
        //session是借助cookie实现的，设置session的时候就自动设置了cookie
        req.session.sign = true;
        req.session.name = 'Toy';
        res.send('welcome Toy')
    }
});
app.listen(8080);