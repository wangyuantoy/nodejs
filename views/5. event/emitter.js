var EventEmitter = require('events');
var util = require('util');
function Girl(name) {
    this.name = name;
}
//让Girl继承EventEmitter的属性
util.inherits(Girl, EventEmitter);
var girl = new Girl();
function Boy(name) {
    this.name = name;
    this.say = function () {

    }
}
var xiaoming = new Boy('小明');
//注册监听  事件  订阅
girl.addListener('look', function () {
    console.log('look')
});
girl.addListener('看', xiaoming.say);
girl.on('看', xiaoming.say);
// 发射事件  发布
girl.emit('look');
girl.emit('看');
//发射多次也只会触发一次
girl.once('饿了',function () {
    console.log('吃饭')
})
girl.on('饿了',function () {
    console.log('吃饭')
})