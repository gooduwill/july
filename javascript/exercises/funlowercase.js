function detectWord(str){
    let result=''
    for(let i=0;i<str.length;i++){
        if(str[i]==str[i].toLowerCase()){
            result=result+str[i]
        }
    }
    return result
}
const result1=detectWord('UcGaFFtN')
console.log(result1)
const result2=detectWord('bEEGBuFBRrHgUHlNFYaYr')
console.log(result2)
const result3=detectWord('YFemHUFBbezFBYzFBYLleGBYEFBGBMENTment')
console.log(result3)
