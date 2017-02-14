var fs = require('fs');

/*
 * process是全局对象，常用属性有三个
 * cwd
 * chdir
 * */
//当前工作的目录
//console.log(process.cwd());
//改变工作目录为childDi
//process.chdir('childDir');

//实例
console.log(fs.readFileSync('index.txt', 'utf8'));
process.chdir('childDir');
console.log(fs.readFileSync('index.txt', 'utf8'));
