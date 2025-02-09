function swap(obj){
const result={}
for(let key in obj){

    result[obj[key]]=key
}

return result


}
console.log(swap({'white':'peace', 'green':'nature'}))