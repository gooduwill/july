function detectWord(str){
const result={
    lowerCase:[]
}
for(let char of str){
if(char==char.toLowerCase())
{
    result.lowerCase.push(char)
}


}
return result


}
console.log(detectWord('UcUGaFGtN'))