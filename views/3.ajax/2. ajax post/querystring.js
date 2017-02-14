
//核心方法，把字符串转化为对象
var querystring=require('querystring');
var s='name=toy&age=20';
console.log(querystring.parse(s));
console.log(querystring.stringify(querystring.parse(s)))