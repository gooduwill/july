function fetchKey(obj,n){
    let result
    for(let key in obj){
        if(obj[key]==n){
            result=key
            break
        }
    }
    return result
}
console.log(fetchKey({a:1,b:2,c:3},1))