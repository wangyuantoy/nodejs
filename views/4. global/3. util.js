var util = require('util');
 function Parent() {
     this.name="parent";
     this.age=50;
     this.say=function () {
         console.log(this.name)
     }
 }
var c=new Parent();
console.log(c)
console.log(util.isArray([1]))