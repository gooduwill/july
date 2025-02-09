function resverseCase(str){
    result=''
    for(let i of str){
        if(i==i.toUpperCase()){
            result=result+i.toLowerCase()
        }
        else{
            result=result+i.toUpperCase()
        }
    }
    return result
}
console.log(resverseCase('Happy Birthday'))
