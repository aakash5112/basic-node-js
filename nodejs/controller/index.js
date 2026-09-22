const {add,sub}=require('../calculator');

function abc(b,n){
    return b*n;
}

console.log(process.argv);

const a=Number(process.argv[2]);
const b=Number(process.argv[3]);

console.log(add(a,b));
console.log(sub(a,b));

module.exports=abc;
