function newWord(str){
    /*const n=str.length
    let result=''
    result=str.slice(1,n)
    return result*/
    return str.slice(1,str.length)
}
console.log(newWord('apple'))
console.log(newWord('cherry'))
console.log(newWord('plum'))

