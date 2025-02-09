function match(str1,str2){
    if(str1.toUpperCase()===str2.toUpperCase()){
        return true
    }
    else {
        return false
    }
}
console.log(match('hello','hELLo'))
console.log(match('venom','VENOM'))
console.log(match('motive','Emotive'))