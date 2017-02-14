var bodyParser = require('./2.bodyParser');
var http=require('http');
/**
 *
 * @param options 访问真正服务器的配置对象
 * @param data  请求体数据
 * @param cb    取得真正服务器响应后的回调函数
 */

module.exports=function (options,data,cb) {
    //向真正的数据服务器发送请求，res代表服务器响应
    var request=http.request(options,function (res) {
        bodyParser(res,function (result) {
            cb(result);
        })

    });
    request.end(data)
};
