function hasSpaces(str){

   for(i=0;i<str.length;i++){
       if(str[i].indexOf(' ')!=-1){
        return true
       }
       else {
        return false
       }
    
    
}
}
console.log(hasSpaces('hello'))
console.log(hasSpaces(' hello,world'))
console.log(hasSpaces('hello  world'))


