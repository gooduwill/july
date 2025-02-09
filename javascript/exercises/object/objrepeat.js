function repeated(arr){
const freq={}
const result=[]
arr.forEach(ele => {
    if(ele in freq){
        freq[ele]=freq[ele]+1
    }
    else{
        freq[ele]=1
    }
});
for(let key in freq){
    if(freq[key]>1){
        result.push(key)
    }
}

return result
}
console.log(repeated(['a','a','b','c','b']))