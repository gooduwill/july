function countPairs(obj){
    //return Object.keys(obj).length
    let count=0
    for(let key in obj){
        count++
    }
    return count
}
console.log(countPairs({a:1,b:2,c:3}))