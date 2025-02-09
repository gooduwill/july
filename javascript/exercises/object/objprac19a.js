function makeObj(arr){
    const result={}
    arr.forEach((ele,i)=>{
    result[i]=ele})
    return result
}
console.log(makeObj(['a','b','c']))