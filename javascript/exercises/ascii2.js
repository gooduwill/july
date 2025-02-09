function asciiCapitalize(str){
    let result=''
    for(let i=0;i<str.length;i++){
        if(str[i].charCodeAt()%2==0){
            result=result+str[i].toUpperCase()
        }
        else{
            result=result+str[i].toLowerCase()
        }
    }
    return result
}
let result1=asciiCapitalize('to be or not to be')
console.log(result1)
