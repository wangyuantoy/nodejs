var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var mail = require('../tools/mail');
var HashMap = require('hashmap');
var _domain = 'http://mmkyf.maimaicn.com/mmjmanager/';


//详情页分发路由、数据传递
router.get('/item*.html', function (req, res, next) {
    var _path = req.path;
    if (!_path) next();
    var reqPathArr = _path.slice(_path.indexOf("-") + 1, _path.indexOf(".")).split("-");
    if (reqPathArr.length === 0) next();
    var gId = reqPathArr[0];
    var paramsJson = JSON.stringify(req.query);
    if (global.__isOnline) {
        _domain = 'http://api.maimaicn.com/mmjmanager/';
    }
    var reqTypeUrl = _domain + 'goodsBase/goodsBaseTypeInfo.action?goodsId=' + gId;
    var reqOneUrl = _domain + 'goodsBase/goodsBaseInfo.action?goodsId=' + gId;
    var reqBindUrl = _domain + 'goodsBase/goodsBaseBindInfo.action?goodsId=' + gId;
    var onePath = 'item/one.html';
    var morePath = 'item/bind.html';
    request.get(reqTypeUrl, {timeout: 10000}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            if (result.infocode == '0') {
                var pageType = result.info.goodsBaseType;
                if (pageType == 1) {
                    request.get(reqOneUrl, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            if (JSON.parse(body).infocode == 0) {
                                res.render(onePath, {
                                    params: paramsJson,
                                    gId: gId,
                                    result: JSON.parse(body).info,
                                    imgPath: "http://image.maimaicn.com/"
                                });
                            } else {
                                next();
                            }
                        }
                    });
                } else if (pageType == 2) {
                    request.get(reqBindUrl, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            if (JSON.parse(body).infocode == 0) {
                                res.render(morePath, {
                                    params: paramsJson,
                                    result: JSON.parse(body).info,
                                    imgPath: "http://image.maimaicn.com/"
                                });
                            } else {
                                next();
                            }
                        }
                    });
                }
            } else {
                res.render(onePath, {params: paramsJson});
            }
        } else {
            if (error && error.code === 'ETIMEDOUT') {//如果请求超时
                mail.send('vipisy@qq.com,254894243@qq.com', 'from: ' + (global.__isOnline ? 'online' : 'offline') + '<br/>api: /goodsBase/goodsBaseTypeInfo.action <br/>info: goods api timeout.');
                res.render(onePath, {params: paramsJson});
            } else {
                console.log(error);
            }
        }
    })
});

//资讯路由
router.get('/news/info*.html', function (req, res, next) {
    var _path = req.path;
    if (!_path) next();
    var reqPathArr = _path.slice(_path.indexOf("-") + 1, _path.indexOf(".")).split("-");
    if (reqPathArr.length === 0) next();
    var newsId = reqPathArr[0];
    if (global.__isOnline) {
        _domain = 'http://api.maimaicn.com/mmjmanager/';
    }
    var getNewsUrl = _domain + '/information/getInformation.action?infoId=' + newsId;
    var newsInfoPath = 'news/info.html';
    request.get(getNewsUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (JSON.parse(body).infocode == 0) {
                res.render(newsInfoPath, {
                    newsId: newsId,
                    result: JSON.parse(body).info
                });
            } else {
                next();
            }
        }
    });
});

//首页分发路由
router.get(/^\/(index.html)?$/, function (req, res, next) {
    var _path = req.path;
    if (!_path) next();
    if (global.__isOnline) {
        _domain = 'http://api.maimaicn.com/mmjmanager/';
    }
    var getNewsUrl = _domain + '/information/getInformationInfo.action?rows=6&typeId=0';
    request.get(getNewsUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if (data.infocode == 0) {
                res.render("index.html", {
                    resultL: data.info
                });
            } else {
                next();
            }
        }
    });
});

//分类页面TDK路由
var map = new HashMap();
var mapb = new HashMap();
router.get('/list/sort.html', function (req, res, next) {
    var params = req.query;
    var result = {};
    if (global.__isOnline) {
        _domain = 'http://api.maimaicn.com/mmjmanager/';
    }
    //***********bid分类*****
    if (params.bId) {
        if (mapb.count() > 0) {
            var typeName = mapb.get(params.bId);
            result = {
                title: typeName + '品牌大全_' + typeName + '网购价格/哪个牌子好 - 买买商城',
                keywords: typeName + ',' + typeName + '大全,' + typeName + '价格,',
                description: '买' + typeName + '来「买买商城」，知名品牌直供，品质把关，实惠放心的线上超市! 下载【买买商城】APP尊享「0元购」惊喜。'
            };
            getSortInfo();
            return;
        }
        var getNewsUrl = _domain + '/goodsBase/getTrademarkAll.action';
        request.get(getNewsUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (JSON.parse(body).infocode == 0) {
                    var typeList = JSON.parse(body).info.list_Trademark;
                    for (var i = 0; i < typeList.length; i++) {
                        mapb.set(typeList[i].trademarkId.toString(), typeList[i].trademarkName);
                    }
                    var typeName = mapb.get(params.bId);
                    result = {
                        title: typeName + '品牌大全_' + typeName + '网购价格/哪个牌子好 - 买买商城',
                        keywords: typeName + ',' + typeName + '大全,' + typeName + '价格,',
                        description: '买' + typeName + '来「买买商城」，知名品牌直供，品质把关，实惠放心的线上超市! 下载【买买商城】APP尊享「0元购」惊喜。'
                    };
                    getSortInfo();
                } else {
                    next();
                }
            }
        });
        return;
    }
    //*************Sid分类*****************
    if (Object.keys(params).indexOf('sId') === -1) {
        next();
        return;
    }
    //********************
    if (map.count() > 0) {
        var typeName = map.get(params.sId);
        result = {
            title: typeName + '品牌大全_' + typeName + '网购价格/哪个牌子好 - 买买商城',
            keywords: typeName + ',' + typeName + '大全,' + typeName + '价格,',
            description: '买' + typeName + '来「买买商城」，知名品牌直供，品质把关，实惠放心的线上超市! 下载【买买商城】APP尊享「0元购」惊喜。'
        };
        getSortInfo();
        return;
    }
    var getNewsUrl = _domain + '/goodsClass/getGoodsClassInfoAll.action';
    request.get(getNewsUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (JSON.parse(body).infocode == 0) {
                var typeList = JSON.parse(body).info.list_goodsClass;
                for (var i = 0; i < typeList.length; i++) {
                    var _list = typeList[i].list_goodsClass_two;
                    for (var k = 0; k < _list.length; k++) {
                        map.set(_list[k].classId.toString(), _list[k].className);
                    }
                }
                var typeName = map.get(params.sId);
                result = {
                    title: typeName + '品牌大全_' + typeName + '网购价格/哪个牌子好 - 买买商城',
                    keywords: typeName + ',' + typeName + '大全,' + typeName + '价格,',
                    description: '买' + typeName + '来「买买商城」，知名品牌直供，品质把关，实惠放心的线上超市! 下载【买买商城】APP尊享「0元购」惊喜。'
                };
                getSortInfo();
                console.log("go");
            } else {
                next();
            }
        }
    });
    
    function getSortInfo(){
        var data = "?classId="+ (params.sId || 71) +"&page="+ (params.page||1) +"&rows=20&trademarkId="+ (params.bId ||'') +"&globalAreaId="+ (params.cId||'') +"&priceRangeValueId="+ (params.pId||'');
        if(params.collectNum){
            data += "&collectNum=" + params.collectNum;
        }else if(params.sellShowNumber){
            data += "&sellShowNumber=" + params.sellShowNumber;
        }else if(params.newGoods){
            data += "&newGoods=" + params.newGoods;
        }else if(params.price){
            data += "&price=" + params.price;
        }else{
            data += "&collectNum=" + 1;
        }
        request.get(_domain + 'goodsBase/goodsBaseListInfo.action' + data, function (error, response, body) {
            if(!error && response.statusCode == 200){
                if (JSON.parse(body).infocode == 0) {
                    res.render(req.path.substring(1), Object.assign({}, result, {list_goodsBase: JSON.parse(body).info.list_goodsBase, count: JSON.parse(body).info.count}));
                }else{
                    next();
                }
              
            }else{
                next();
            }
        });
    }
});

//自动路由  在指定路由顺序之下
var fs = require("fs");//filesystem  操作文件工具
var autoViews = {};
router.get('*', function (req, res, next) {
    var _reqUrl = req.path.substring(1);
    var _re_req = _reqUrl.replace(".", "_").replace(new RegExp("/", "gm"), "-");//因对象中不能以".""/"命名，替换为"_""-"
    if (autoViews[_re_req])return res.render(_reqUrl, {title: '买买电商 - maimaicn.com'});//如果缓存中有此视图名，指向对应视图
    var viewsFolder = path.resolve(__dirname, '../views/', _reqUrl);//视图文件路径
    if (fs.existsSync(viewsFolder)) {//判断请求地址是否存在
        var stat = fs.lstatSync(viewsFolder);//判断请求地址是否为文件
        if (stat.isFile()) {
            autoViews[_re_req] = _reqUrl.replace(/^\//, '');//写入缓存
            return res.render(autoViews[_re_req], {title: '买买电商 - maimaicn.com'});
        }
    }
    next();//如果视图目录无匹配视图，向下传递继续处理
});


module.exports = router;
