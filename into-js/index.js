//hoisting :-funcns,variable,arrays
//hoisting in variables is nothing but var is hoisted i.e declared anywhere

const { json } = require("express");

//lly funcns with function keyword is hoisted
a=10;
console.log(a);
var a;

b=1;
console.log(b);
// let b;// reference error

function name() {
    console.log("abc");    
}

function name(a,b) {
    console.log("abc",a,b);    
}
name(4,5);
name();

//rest
function fun1(a,b,...rest) {
    console.log(a,b,rest);
}
fun1(1,2,5,"hi","yoyo");
obj={
    i:45,
    h:55
}
a=Array.of(1,2,3,4);
b=[1,2,3,4];

console.log(a==b);//seeing memory location not inside nums
console.log("Girish".split(''));
//array methods
//shift,u

let k=[1,2,3,4,5].reduce((p,q)=>p+q);
console.log(k);
jsObj={
    name:"girish",
    grade:"A+"
}
console.log(JSON.stringify(jsObj));