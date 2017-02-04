var querystring=require('querystring');
var s='name=toy&age=20';
console.log(querystring.parse(s));
console.log(querystring.stringify(querystring.parse(s)))