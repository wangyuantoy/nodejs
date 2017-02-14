//获取模块的文件的绝对路径
console.log(__filename);
//获取模块的文件所在目录的绝对路径
console.log(__dirname);
console.log(global)
/*
* 全局对象下的属性有5种
* console
* __filename //不是global的属性，而是参数
* __dirname  //不是global的属性，而是参数
* setTimeout/setInterval
* setImmediate
* */