function count(str){
const result={d:0,c:0,t:0}
for(let char of str)
{
if(char in result){
    result[char]=result[char]+1
}

}

return result

}
console.log(count('ddccttd'))