const str='ddcctaccaddemy'
function nonAdjacent(str){
    let result=''
    for(let i=0;i<str.length;i++){
        if(result[result.length-1]!=str[i]){
            result=result+str[i]
        }
    }
    return result
}
console.log(nonAdjacent('ddcctaccaddemy'))