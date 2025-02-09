function findLength(arr){
const result={}
for(let str of arr){
    result[str]=str.length
}
return result

}
console.log(findLength(['a','ab','abc']))