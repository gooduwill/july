function makeObj(arr){
let result={}
for(let key of arr){
    result[key]=key
}
return result









}
console.log(makeObj(['a','b','c']))
const makeObj = arr => {  
    const obj = arr.reduce((acc, cur, i) => {
        acc[i] = cur
        return  acc
    }, {})
    return obj
}
console.log(makeObj(["a", "b", "c"]));