function withCapitals(str){
const result={}
for(let char of str){
    result[char]=char.toUpperCase()
}
return result

}
console.log(withCapitals('abc'))
