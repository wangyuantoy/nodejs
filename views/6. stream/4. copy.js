var fs = require('fs');
//用可读文件流和可写文件流实现文件copy
function copy(src, target) {
    var rs = fs.createReadStream(src,{highWaterMark:10});
    var ws = fs.createWriteStream(target);
    rs.setEncoding('utf8');
    rs.on('data', function (data) {
            ws.write(data);
    });
    rs.on('end', function () {
        ws.end();
    })
}
copy('./resource.txt','./copied.txt');
