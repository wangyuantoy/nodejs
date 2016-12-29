
var $ajax = function (url, callback) {
    var xhr = new XMLHttpRequest;
    //->判断传递进来的URL是否存在?,存在的话我们使用&_=,没有问号的话,我们使用?_=
    url.indexOf("?") > -1 ? url += "&_=" + Math.random() : url += "?_=" + Math.random();
    xhr.open("get", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            var con = xhr.responseText;
            con = JSON.parse(con);
            typeof callback === "function" ? callback(con) : null;
        }
    };
    xhr.send(null);
};

var page = 1, count = 10, totalPage = 0;

//->开始加载页面的时候,首先把第一页的数据请求回来,然后分别的把第一页的内容和分页页码进行动态绑定
$ajax("/getInfo?count=" + count + "&page=" + page, function (con) {
    bindList(con.list);

    totalPage = con.totalPage;
    bindPage(totalPage);

    changePage();
});

//->绑定列表的数据
function bindList(data) {
    var str = "";
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        var sex = cur.sex === 1 ? "男" : "女";
        str += "<li num='" + cur.num + "'>";
        str += "<span>" + cur.num + "</span>";
        str += "<span>" + sex + "</span>";
        str += "<span>" + cur.score + "</span>";
        str += "</li>";
    }
    var dataList = document.getElementById("dataList");
    dataList.innerHTML = str;

    var oLis = dataList.getElementsByTagName("li");
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].onclick = function () {
            //window.location.href = "detail.html"; //->在当前窗口打开新的页面
            window.open("detail.html?num=" + this.getAttribute("num"));//->在一个新的窗口打开新页面
        }
    }
}

//->绑定分页页码数据
function bindPage(totalPage) {
    var str = "";
    for (var i = 1; i <= totalPage; i++) {
        str += "<li>" + i + "</li>";
    }
    document.getElementById("pageList").innerHTML = str;
}

//->让当前页的页码选中
function changePage() {
    var oLis = document.getElementById("pageList").getElementsByTagName("li");
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = (i + 1) == page ? "bg" : null;
    }
}


//->用事件委托实现我们的分页逻辑
document.getElementById("page").onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;

    //->说明点击的是每一个LI页码
    if (tar.tagName.toLowerCase() === "li") {
        page = Number(tar.innerHTML);
        getInfoModel();
        return;
    }

    //->fir:首页 pre:上一页 next:下一页 last:尾页
    if (tar.className === "fir") {
        page = 1;
        getInfoModel();
        return;
    }

    if (tar.className === "last") {
        page = totalPage;
        getInfoModel();
        return;
    }

    if (tar.className === "pre") {
        if (page == 1) {
            return;
        }
        page--;
        getInfoModel();
        return;
    }

    if (tar.className === "next") {
        if (page == totalPage) {
            return;
        }
        page++;
        getInfoModel();
        return;
    }
};

//->文本框输入内容跳转
document.getElementById("inputTo").onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        //->按下的是Enter键
        var val = this.value.replace(/(^ +| +$)/g, "");

        if (isNaN(val)) {//->输入的不是数字,我们认为是无效的操作
            this.value = "";
            return;
        }

        if (val < 1) {
            page = 1;
            this.value = "1";
        } else if (val > totalPage) {
            page = totalPage;
            this.value = totalPage;
        } else {
            page = Number(val);
        }
        getInfoModel();
    }
};

function getInfoModel() {
    $ajax("/getInfo?count=" + count + "&page=" + page, function (con) {
        bindList(con.list);
        changePage();
    });
}