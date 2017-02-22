
//渲染模板
function render(tmpl,data){
    //用真实的值替换占位变量
    return tmpl.replace(/\{\{(\w+)\}\}/,function (group1, group2) {
        return data[group2]
    })
}
var result=render('<h1>{{title}}<h1>',{title:'欢迎'});
console.log(result);