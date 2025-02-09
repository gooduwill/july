function isLastCharacterN(str){
    if(str.charAt(str.length-1)=='n'){
        return true
    } else{
        return false
    }
}
console.log(isLastCharacterN('Aiden'))
console.log(isLastCharacterN('Piet'))
