function lettersOnly(str){
    let result=''
    for(let i=0;i<str.length;i++){
        if(str[i].charCodeAt()>=65 && str[i].charCodeAt()<=90){
            result=result+str[i]
        }
        else if(str[i].charCodeAt()>=97 && str[i].charCodeAt()<=122){
            result=result+str[i]
        }
    }
    return result
}
console.log(lettersOnly('R!=:~0o./c&}9k60=y'))