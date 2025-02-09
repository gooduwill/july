function frequency(str){
const result={}
for(let char of str){
    if(char in result){
     result[char]=result[char]+1
    }
    else{
        result[char]=1
    }
}

return result
}
console.log(frequency('ddccttd'))