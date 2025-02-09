const asciiCapitalize=function (str){
    let result=''
    for(let i of str)
    {
        if(i.charCodeAt()%2==0){
            result=result+i.toUpperCase()
        }
        else{
            result=result+i.toLowerCase()
        }
    }
    return result
}
console.log(asciiCapitalize('to be or not to be'))
