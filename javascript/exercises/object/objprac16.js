function getPairs(obj){
    const result=[]
    for(let key in obj){
        result.push([key,obj[key]])
    }
    return result
}
console.log(getPairs({a:1,b:2,c:3}))
