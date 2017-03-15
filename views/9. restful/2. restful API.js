var express = require('express');
var path=require('path');
var bodyParser=require('body-parser');
var app = express();
//存放所有用户
var users = [{id:1,name:'aaa'},{id:2,name:'bbb'}];
app.set('view engine','ejs');
app.set('views',path.resolve());
app.use(bodyParser.urlencoded({extended:true}));
/**
 * 1.GET/collection 查询所有用户
 * 2.GET/collection/id 返回单个资源对象
 * 3.POST/collection    返回新生产的资源对象
 * 4.PUT/collection/id  返回完整的资源对象
 * 5.PATCH/collection/id 返回完整的资源对象
 * 6.DELETE/collection/id   返回一个空资源
 */
//1.获取所有用户 http://localhost:8080/users
app.get('/users', function (req, res) {
    //请求头里包括accept，表示请求什么类型的数据
    // Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    //application/xml;q=0.9    q代表权重
    var accept = req.headers['accept'];
    var acceptType = accept.split(',').map(function (item) {
        var values = item.split(';');
        return {
            type: values[0], //需要的文件类型
            q: values[1] ? values[1].split('=')[1] : 1    //权重默认1
        }
    }).sort(function (a, b) {//数组按优先级降序排列
        return b.q - a.q;
    })[0].type;
    if(acceptType=='text/html'){
        res.setHeader('Content-Type',acceptType);
        res.render('2. users.ejs',{users:users})
    }else if(acceptType=='text/plain'){
        res.setHeader('Content-Type',acceptType);
        res.render('2. users.ejs',{users:users})
    }else{
        res.send(users)
    }

});
//2.返回某个用户信息 http://localhost:8080/users/1
app.get('/users/:id', function (req, res) {
    var id=req.params.id;
    var filterdUsers=users.filter(function (user) {
        return user.id==id;
    });
    res.send(filterdUsers.length>0?filterdUsers[0]:'此用户不存在')
});
//3. 新增加用户  http://localhost:8080/users
//获取请求体要使用bodyParser中间件
//测试：curl -X POST --data "name=ccc" http://localhost:8080/users
app.post('/users', function (req, res) {
    var addedUser=req.body;
    if(addedUser){
        //设置获取的请求体id并放到users数组的最后一项
        addedUser.id=users[users.length-1].id+1;
        users.push(addedUser);
        //新增加一个资源时返回新生成的资源完整对象
        res.send(addedUser)
    }else{
        res.send({msg:'增加资源失败'})
    }
});
//4. 整体更新某个对象的全部属性
//测试：curl -X put --data "id=2&name=BBB" http://localhost:8080/users/2
app.put('/users/:id', function (req, res) {
    var putUser=req.body;
    if(putUser){
        for(var i=0;i<users.length;i++){
            //判断当前用户和新传进来的id是否一致
            if(users[i].id==req.params.id){
                users[i]=putUser;//把老的对象整体替换成新的对象
                break;
            }
        }
        res.send(putUser)
    }else{
        res.send({msg:'增加资源失败'})
    }
});
//5. 局部更新，请求体里直传要更新的字段
// 测试：curl -X PATCH --data "name=BBBbbb" http://localhost:8080/users/2
app.patch('/users/:id', function (req, res) {
    var updateFields=req.body;
    if(updateFields){
        for(var i=0;i<users.length;i++){
            //判断当前用户和新传进来的id是否一致
            if(users[i].id==req.params.id){
                for(var attr in updateFields){
                    if(updateFields.hasOwnProperty(attr)){
                        //用新的替换旧的
                        users[i][attr]=updateFields[attr]
                    }
                    res.send(users[i]);
                    break
                }
            }
        }

    }else{
        res.send({msg:'增加资源失败'})
    }
});
//6. 删除
// 测试：curl -X DELETE http://localhost:8080/users/2
app.delete('/users/:id', function (req, res) {
    for(var i=0;i<users.length;i++){
        if(users[i].id==req.params.id){
            //删除到匹配的项
            users.splice(i,1);
            res.send({});
            return;
        }
    }
    res.end({msg:'删除失败'})
});

app.listen(8080);