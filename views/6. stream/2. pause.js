var fs = require('fs');

var rs = fs.createReadStream('./index.txt',{encoding:"utf8",start:3,end:8,highWaterMark:2});
// pause暂停  resume恢复
// 读取出来的数据1秒钟输出一次
rs.on('data',function (data) {
    rs.pause();
    setTimeout(function () {
        console.log(data);
        rs.resume()
    },1000)
});
rs.on('end',function () {
    console.log('end')
});
rs.on('error',function (err) {
    console.error(err)
});
