function repeated(arr){
const result=[],  freq={}
for(let char of arr){
    if(char in freq){
        freq[char]=freq[char]+1
    }
    else{
        freq[char]=1
    }
}
for(let key in freq){
    if(freq[key]>1){
        result.push(key)
    }
}
return result

}
console.log(repeated(['a','a','b','b','c','d']))