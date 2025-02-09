function multiplyNums(str){
let result=1
for(let i=0;i<str.length;i++){
    if(str[i]!=' ' && str[i]!=',')
    {
        result=str[i]*result
    }
}
return result
}
console.log(multiplyNums('2, 3'))
console.log(multiplyNums('1, 2, 3, 4'))

