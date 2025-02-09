function squareDigits(num){
    let result=''
    num=num.toString()
    for(let i=0;i<num.length;i++){
        result=result+(num[i]*num[i]).toString()
    }
    return Number(result)
}
console.log(squareDigits(9119))