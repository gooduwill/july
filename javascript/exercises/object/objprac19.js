function makeObj(arr){
    const result={}
    for(let i=0;i<arr.length;i++){
        result[i]=arr[i]
    }
    return result
}
console.log(makeObj(['a','b','c']))