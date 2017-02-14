var fs = require('fs');
//用pipe实现文件copy
function copy(src, target) {
    var rs = fs.createReadStream(src,{highWaterMark:10});
    var ws = fs.createWriteStream(target);
    rs.pipe(ws)
}
copy('./resource.txt','./copied.txt');
