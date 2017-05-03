const fs = require('fs');
var promise=new Promise(function(resolve, reject) {
        fs.readFile('1.text','UTF8',function (err,file) {
            resolve(file);
    });
});
promise.then(function (data) {
        fs.readFile(data,'utf8',function (err,data) {
            if(!err){
                console.log(data);
            }
        });
    return "3.text"
}).then(function (data) {
    fs.readFile(data,'utf8',function (err, data) {
        if(!err){
            console.log(data)
        }
    })
}).catch(function (reason) {
    console.log(reason)
});