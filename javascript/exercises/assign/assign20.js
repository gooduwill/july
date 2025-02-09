function countSyllables(str){
    const result=str.slice(0,2).toLowerCase()
    let count=0
    for(let i=0;i<str.length;i=i+2){
        if(result==str.slice(i,i+2).toLowerCase()){
            count++
        }
    }
    return count
}
console.log(countSyllables('Hehehehehehe'))
console.log(countSyllables('NANANA'))