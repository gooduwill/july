function isIdentical(str){
let count=0
const result=str[0]
for(let i=0;i<str.length;i++){
    if(result==str[i]){
        count++
        if(count==str.length-1){
            return true
        }
    }
    else{
        return false
    }
}

}
console.log(isIdentical('aaaaa'))
console.log(isIdentical('aabcda'))