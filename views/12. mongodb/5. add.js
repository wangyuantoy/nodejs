var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://XXXXX');

db.connection.on('error', function (error) {
    console.log('数据连接失败：' + error)
});
db.connection.on('open', function (error) {
    console.log('数据连接成功')
});

var PersonSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    time: {type: Date, default: Date.now},
    email: {type: String, default: ''}
});

var PersonModel = db.model("person", PersonSchema);
//根据模型创建实体，个体对象
var personEntity = new PersonModel({
    name: "toy",
    age: 30,
    email: "666666@qq.com"
});
console.log(personEntity.name); // toy
console.log(personEntity.age); // 30

/**
 * Model保存方法
 * Model.create(文档数据, callback))
 */
//向集合中插入10个文档
for (var i = 0; i < 10; i++) {
    PersonModel.create({name: "toy" + i, age: i}, function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });
}
/**
 * entity保存方法
 * Entity.save(文档数据, callback))
 */
//model调用的是create方法，entity调用的是save方法
var PersonEntity = new PersonModel({name:"toy",age: 20});

PersonEntity.save(function(error,doc) {
    if(error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});
