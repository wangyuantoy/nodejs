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
 * 删除数据
 * Model.remove(查询条件,callback);
 */
var conditions = { name: 'zfpx' };

PersonModel.remove(conditions, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Delete success!');
    }
});






