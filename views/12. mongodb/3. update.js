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

/**
 * 数据更新
 * Model.update(查询条件,更新对象,callback);
 */
var conditions = {name : 'toy'};
// $set更新器
var update = {$set : { age : 100 }};
PersonModel.update(conditions, update, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Update success!');
    }
});
// 以上如果匹配到多条记录，默认只更新一条，如果要更新匹配到的所有记录的话需要加一个参数 {multi:true}
PersonModel.update(conditions, update,{multi:true},function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Update success!');
    }
});






