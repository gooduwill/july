function checkPallindrome(str){
let count=0
for(let i=0;i<str.length;i++){
    if(str[i]==str[str.length-i-1]){
     count++
    if(count==str.length-1)
    {
        return 'pallindrome'
    }
}
else {
    return 'not pollindrome'
}
}





}
console.log(checkPallindrome('mom'))
console.log(checkPallindrome('reviver'))
console.log(checkPallindrome('scary'))