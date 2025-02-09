function addName(object,name,price){
    object[name]=price
    return object
}
console.log(addName({},'Brutus',300))