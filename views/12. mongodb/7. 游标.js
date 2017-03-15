/**
 * Created by MMai9 on 2017/3/3.
 */
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
var PersonModel = db.PersonModel("person", PersonSchema);
/**
 * limit函数的基本用法
 * 限制数量：find(Conditions,fields,options,callback);
 * 不足20，返回实际数量
 */
PersonModel.find({name:'toy'},{name:1, age:1, _id:0},{limit:20},function(err,docs){
    console.log(docs);
});
/**
 * skip函数的基本用法
 * 跳过数量：find(Conditions,fields,options,callback);
 * 查询结果数量中少于4个，则不会返回任何结果
 */
PersonModel.find({},null,{skip:4},function(err,docs){
    console.log(docs);
});
/**
 * sort函数的基本用法
 * 结果排序：find(Conditions,fields,options,callback);
 * 将查询结果数据进行排序操作，该函数的参数是一个或多个键/值对，键代表要排序的键名，值代表排序的方向，1是升序，-1是降序。
 */
PersonModel.find({},null,{sort:{age:-1}},function(err,docs){
    //查询所有数据，并按照age降序顺序返回数据docs
});