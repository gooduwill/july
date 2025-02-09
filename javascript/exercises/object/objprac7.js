function detectWord(str){

    const result={}
for(let char of str){
if(char==char.toLowerCase()){
    result[char]=char
}
}



return result


}
console.log(detectWord('UcUGaFGtN'))