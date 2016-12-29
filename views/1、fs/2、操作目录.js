var fs = require("fs");
var path = require("path");

//1、创建目录 make directory
// 1、fs.mkdir("test", function (err) { //第一个参数也可以是路径，eg：test/t  test下创建了t文件夹 注意：test目录必须已经存在
//     if (err) {
//         console.log("目录创建失败")
//     } else {
//         console.log("目录创建成功")
//     }
// });
/*以下方法实现了循环创建多个层级的目录*/
function createDir(p) {
    var pathAry = p.split("/");
    var createPath = "";
    /*异步方法，递归*/
    var dd = function (i) {
        if (i == pathAry.length) return;
        createPath = (i === 0 ? pathAry[i] : path.join(createPath, pathAry[i]));
        fs.exists(createPath, function (exists) {
            if (!exists) {
                fs.mkdir(createPath, function (err) {
                    if (!err) {
                        console.log(createPath + "创建成功");
                        dd(++i);
                    } else {
                        console.log(err)
                    }
                })
            }
        })
    };
    dd(0);
    /*同步方法*/
    // for (var i = 0; i < pathAry.length; i++) {
    //     createPath = (i === 0 ? pathAry[i] : path.join(createPath, pathAry[i]));
    //     if (!1、fs.existsSync(createPath)) {
    //         1、fs.mkdirSync(createPath, function (err) {
    //             if (err) {
    //                 console.log(err)
    //             }
    //         })
    //     }
    // }
}
createDir("test/t1/t2/t3");
//2、读取目录下所有文件/文件夹
fs.readdir("./book", function (err, files) {
    if (err) {
        console.log(err);
    } else {
        console.log(files); //输出是目录下文件名组成的数组
    }
});
//3、获取目录下所有文件/目录详情
fs.readdir("./book", function (err, files) {
    if (err) {
        console.log(err);
    } else {
        files.forEach(function (file) {
            fs.stat(path.join("./book", file), function (err, state) {
                console.log(state)
                console.log(state.isDirectory());
                console.log(state.isFile())
            })
        })

        console.log(files); //输出是目录下文件名组成的数组
    }
});