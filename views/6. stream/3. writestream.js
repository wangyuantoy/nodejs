var fs = require('fs');
/*
 * 可写流
 * 第一个参数是写文件路径，如果不存在，自动创建
 * 第二个参数option对象
 * { flags: 'w', 默认w(清空并写入)，a(append追加到最后)
 encoding: null,  编码规则，默认null
 start:   用正数表示文件开始字节数的写入位置
 autoClose: true   写完成是否自动关闭
 highWaterMark 最高水位线，write()开始返回false的缓冲大小，默认16kb
 }*/
var ws = fs.createWriteStream('./write.txt',{flag:"a",encoding:"utf8",start:20});
ws.write('北','utf8',function () {
    console.log(arguments)
});
ws.write('京','utf8',function () {
    console.log(arguments)
});
ws.end('首都','utf8');
