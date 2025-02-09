function countChar(str,char){
let count=0
str='manglore'
for(let i=0;i<str.length;i++){
    if(str[i]==char){
        count++
    }
}
return count
}
let result1=countChar('bangalore','a')
console.log(result1)
