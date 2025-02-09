function getValues(obj){
    //return Object.values(obj)
    const result=[]
    for(let key in obj){
        result.push(obj[key])
    }
    return result
}
console.log(getValues({a:1,b:2,c:3}))