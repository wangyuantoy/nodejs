/*
* setImmediat和setTimeout时间间隔为0时，两个运行先后顺序随机*/
//每次都要比对时间
setTimeout(function () {
    console.log('a')
},0);
//效率高，直接执行
//在下一个事件环中执行此函数
setImmediate(function () {
    console.log('b')
});
/*把这个函数放在当前的任务末尾*/
process.nextTick(function () {
    console.log('c')
});
console.log('d');