function repeat(str,n){
    let result=''
    for(let i=0;i<str.length;i++){
        result=result+str.charAt(i).repeat(n)
    }
    return result
}
console.log(repeat('mice',5))