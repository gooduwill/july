function countercodeCharCode(char){
    
    if(char==char.toUpperCase()){
        return char.toLowerCase().charCodeAt()
    }
    else{
        return char.toUpperCase().charCodeAt()
    }
}
console.log(countercodeCharCode('z'))