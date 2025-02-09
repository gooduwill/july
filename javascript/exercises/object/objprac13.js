function getKeys(obj){
    const result=[]
for(let key in obj){
    result.push(key)
}
return result
}
console.log(getKeys({a:1,b:2,c:3}))
