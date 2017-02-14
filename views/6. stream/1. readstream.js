var fs = require('fs');
/*
* 可读流
* 第一个参数是读取文件路径
* 第二个参数option对象
* { flags: 'r', 是否替换
 encoding: null,  编码规则
 start:   读取的起始位置
 end：    读取的结束位置
 fd: null,
 mode: 0666,
 autoClose: true   读取完成是否自动关闭
 highWaterMark 最高水位线，停止从底层资源读取前内部缓存区最多能存放的字节数，默认64kb
 }*/
//设置起始、结束位置和每次读取的字节数，每读取一次触发一次data事件
var rs = fs.createReadStream('./index.txt',{encoding:"utf8",start:3,end:8,highWaterMark:3});
//rs.setEncoding('utf8') 效果跟在参数里设置一样
//有三个事件 data end error
rs.on('data',function (data) {
    console.log(data)
});
rs.on('end',function () {
    console.log('end')
});
rs.on('error',function (err) {
    console.error(err)
});
/*
* nodejs中常用的检测错误的方法
* 1. 同步方法 try catch
* 2. 异步方法时 判断回调函数里的error对象是否有值
* 3. 流里面是监听error事件
* */