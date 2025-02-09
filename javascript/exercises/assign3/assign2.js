function indexMultiplier(arr){
let result=0
if(arr.length!=0){
    for(let i=0;i<arr.length;i++){
        result=result+i*arr[i]
    }
    return result
}
else{
    return 0
}

}
console.log(indexMultiplier([1,2,3,4,5]))