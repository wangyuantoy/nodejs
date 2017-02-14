module.exports=function (req,cb) {
    var result = '';
    req.on('data', function (data) {
        result += data;
    });
    req.on('end', function () {
        cb(result)
    });
};