/**
 * 连接数据库
 */
// 1. 安装mongoose
// 2. 加载模块
var mongoose = require('mongoose');
//连接数据库，参数是数据库地址
// 3. 连接数据库
var db = mongoose.connect('mongodb://XXXXX');
//如果连接成功会执行error回调
db.connection.on('error', function (error) {
    console.log('数据连接失败：' + error)
});
//如果连接成功会执行open回调
db.connection.on('open', function (error) {
    console.log('数据连接成功')
});
/**
 * 如果要通过Mongoose去创建一个“集合”并对其进行增删改查，了解Schema(数据属性模型)、Model、Entity了。
 */
//定义一个schema，描述此集合有哪些字段，字段类型是什么
var PersonSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    time: {type: Date, default: Date.now},
    email: {type: String, default: ''}
});
//创建模型。可以用来操作数据库中person集合，整体对象
var PersonModel = db.model("person", PersonSchema);
//根据模型创建实体，个体对象
var personEntity = new PersonModel({
    name: "toy",
    age: 30,
    email: "666666@qq.com"
});
console.log(personEntity.name); // toy
console.log(personEntity.age); // 30
// 用save方法把自己保存到数据库中，doc是保存的信息
personEntity.save(function (error, doc) {
    if (error) {
        console.log("error :" + error);
    } else {
        console.log(doc);
    }
});

/**
 * 查询数据库
 *  obj.find(查询条件,callback);
 */
//创建模型，可以用它来操作数据库中的person集合
var PersonModel = db.model('person', PersonSchema);
//find有两个参数,第一个是查询条件，第二个回调
PersonModel.find({name: 'toy'}, function (err, docs) {
    //有错报错，没错输出查询结果
    if (err) {
        console.log(err)
    } else {
        console.log(docs)
    }
});
