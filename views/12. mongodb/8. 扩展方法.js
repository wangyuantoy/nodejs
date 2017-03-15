/**
 *  ObjectId简述
 存储在mongodb集合中的每个文档（document）都有一个默认的主键_id，这个主键名称是固定的，它可以是mongodb支持的任何数据类型，默认是ObjectId。该类型的值由系统自己生成，从某种意义上几乎不会重复

 MySQL等关系型数据库的主键都是自增的。但在分布式环境下，这种方法就不可行了，会产生冲突。为此，MongoDB采用了一个称之为ObjectId的类型来做主键。ObjectId是一个12字节的 BSON 类型字符串。按照字节顺序，依次代表：
 4字节：UNIX时间戳
 3字节：表示运行MongoDB的机器
 2字节：表示生成此_id的进程
 3字节：由一个随机数开始的计数器生成的值
 var mongoose = require('mongoose');
 var personSchema = new mongoose.Schema({}); //默认_id:ObjectId类型
 每一个文档都有一个特殊的键“_id”，这个键在文档所属的集合中是唯一的。
 */

/**
 * Schema添加属性值
 */
var mongoose = require('mongoose');
var PersonSchema = new mongoose.Schema;
PersonSchema.add({ name: 'String', email: 'String', age: 'Number' });

/**
 * 实例方法
 * 创造的Schema不仅可以为后面的Model和Entity提供公共的属性，还可以提供公共的方法
 */
var mongoose = require('mongoose');
var personSchema = new mongoose.Schema({name : String});
personSchema.method('greet', function () {
    console.log('how are you');
});
var Person = mongoose.model('person', personSchema);
var person = new Person();
person.greet(); //how are you

/**
 * Schema静态方法
 * 创造的Schema不仅可以为后面的Model和Entity提供公共的属性，还可以提供公共的方法
 */
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://123.57.143.189:27017/toy");
var PersonSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 }
});
PersonSchema.static('findByName', function (name, callback) {
    return this.find({ name: name }, callback);
});
var PersonModel = db.model("person", PersonSchema );
PersonModel.findByName('toy', function (err, docs) {
    //docs所有名字叫zfpx的文档结果集
});