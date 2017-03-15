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

//Mongoose 模型提供了find、findOne、和findById方法用于文档查询。
/**
 * 属性过滤 find(Conditions,field,callback);
 * field省略或为Null，则返回所有属性。 属性1为返回，0为不返回
 * _id是默认返回，如果不要显示加上("_id":0)，
 */
PersonModel.find({},{name:1, age:1, _id:0},function(err,docs){
    //docs 查询结果集
});
/**
 * findOne(查询单条)
 * 单条数据 findOne(Conditions,callback);
 */

PersonModel.findOne({ age: 6}, function (err, doc){
    // 查询符合age等于6的第一条数据
    // doc是查询结果
});

/**
 * findById(按ID单条数据)
 * 与findOne相同，但它只接收文档的_id作为参数，返回单个文档。
 * findById(_id, callback);
 * 也可以加上field参数，返回相应的属性
 */
PersonModel.findById('123', {name:1, age:1},function (err, doc){
    //doc 查询结果文档
});

/**
 * $gt(>)、$lt(<)、$lte(<=)、$gte(>=)
 */
PersonModel.find({"age":{"$gt":6}},function(error,docs){
    //查询所有nage大于6的数据
});

PersonModel.find({"age":{"$lt":6}},function(error,docs){
    //查询所有nage小于6的数据
});

PersonModel.find({"age":{"$gt":6,"$lt":9}},function(error,docs){
    //查询所有nage大于6小于9的数据
});
/**
 * $ne(不等于)
 * $ne可以匹配单个值，也可以匹配不同类型的值。
 */
PersonModel.find({ age:{ $ne:6}},function(error,docs){
    //查询age不等于24的所有数据
});

PersonModel.find({name:{$ne:"toy"},age:{$gte:6}},function(error,docs){
    //查询name不等于toy且age>=6的所有数据
});
/**
 * $in(包含)
 * 和$ne操作符相反，$in相当于包含、等于，查询时查找包含于指定字段条件的数据
 */
PersonModel.find({ age:{ $in: 6}},function(error,docs){
    //查询age等于6的所有数据
});
PersonModel.find({ age:{$in:[6,7]}},function(error,docs){
    //可以把多个值组织成一个数组，返回6或者7的结果
});
/**
 * $or(或者)
 */
PersonModel.find({"$or":[{"name":"toy"},{"age":6}]},function(error,docs){
    //查询name为toy或age为6的全部文档
});
/**
 * $exists(是否存在)
 */
PersonModel.find({name: {$exists: true}},function(error,docs){
    //查询所有存在name属性的文档
});

PersonModel.find({email: {$exists: false}},function(error,docs){
    //查询所有不存在email属性的文档
});


