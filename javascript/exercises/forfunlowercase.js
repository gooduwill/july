function detectWord(str){
    let result=''
    let result2=''
    for(let i of str){
        if(i==i.toLowerCase()){
            result=result+i
        }
        else{
            result2=result2+i
        }
    } console.log(result2)
    return result
}
const result1=detectWord('UcGaFFtN')
console.log(result1)
const result2=detectWord('bEEGBuFBRrHgUHlNFYaYr')
console.log(result2)
const result3=detectWord('YFemHUFBbezFBYzFBYLleGBYEFBGBMENTment')
console.log(result3)
