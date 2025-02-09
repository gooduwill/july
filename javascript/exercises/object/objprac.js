const city="bangalore"
function freqVowels(str){
const result={a:0,e:0,i:0,o:0,u:0}
for(let char of str){
if(char in result){
    result[char]=result[char]+1
}

}
return result
}
console.log(freqVowels(city))