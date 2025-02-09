function makeTitle(str){
    let result
    for(let i=0; i<str.length;i++  ){
        if(i==0 && str[i]!=str[i].toUpperCase()){
            result=result+str[i].toUpperCase()
        }
            else if(str[i]==' '){
               result=result+str[i+1].toUpperCase()
        }
                else{ result=result+str[i]}
}
                    return result

}
console.log(makeTitle("This is a title"))