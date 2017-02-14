var fs = require("fs");

/*
 * 写入文件
 * 第三个参数flag默认是"w",会覆盖原文件内容
 * "a"，往原文件追加内容，可以用fs.appendFile替代
 * */
fs.writeFile("./name.html", "toy", {flag: "a"}, function (err) {
    if (err) {
        console.log(err);
    }
});
fs.writeFile("./age.html", "29", {flag: "a"}, function (err) {
    if (err) {
        console.log(err);
    }
});
/*
 * 同时输出读取两个文件
 * 1、同步读取
 * 2、异步读取
 * */
//1、同步方法，
// 用try catch解决报错。
// 缺点:耗费时间，如果读取失败整个程序会卡在这
try {
    var name = fs.readFileSync("./name.html", "utf8");
    var age = fs.readFileSync("./age.html", "utf8");
    console.log(name, age)
} catch (e) {
    console.log(e)
}

//2、异步方法(比同步方法节省时间)
//1)、嵌套式写法，(不推荐,因为层级关系越多，代码可读性越差）
fs.readFile("./name.html", "utf8", function (err, name) {
    if (err) {
        console.log(err)
    } else {
        fs.readFile("./age.html", "utf8", function (err, age) {
            if (err) {
                console.log(err)
            } else {
                console.log(name, age)
            }
        })
    }
});
//2)、运用回调函数
var person = {};
var count = 0;
function print() {
    if (count == 2) { //读取完2个文件后输出
        console.log(person);
    }
}
fs.readFile("./name.html", "utf8", function (err, name) {
    if (err) {
        console.log(err)
    } else {
        person.name = name;
        count++; //读取一次count增加1
        print();
    }
});
fs.readFile("./age.html", "utf8", function (err, age) {
    if (err) {
        console.log(err)
    } else {
        person.age = age;
        count++;
        print();
    }
});

// copy一个文件,也可以用来copy图片，因图片是二进制编码，readFile第二个参数不能写"utf8",要写"binary",也可以不写
function copy(src, target) {
    fs.readFile(src, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile(target, data, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("copy success from" + src + "to" + target)
                }
            })
        }
    })
}
copy("./files.html", "./copyFile.index");









