var fs = require("fs");
var path = require("path");

//合并path

console.log(path.join("./book","js.js"));
//seperator 分隔符
console.log(path.sep);
console.log(__filename); //获取当前模块的绝对路径
console.log(__dirname); //获取当前模块的绝对目录
console.log(path.basename("7、path.js",".js")); //获取文件名，第二个参数是要去除的扩展名
console.log(path.extname("7、path.js")); //获取文件扩展名
console.log(path.resolve()); //从相对路径解析出绝对路径,以应用程序所在目录为根起点
console.log(path.resolve("book"));//有多少参数就拼接多少
console.log(path.resolve("book","json.json"));
console.log(path.resolve("book","json.json","..","js.js")); // ..上级目录  .当前目录 都可以解析