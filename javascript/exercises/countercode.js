function counterpartCharCode(char){
if(char==char.toUpperCase()){
    char=char.toLowerCase()
}
else{
    char=char.toUpperCase()
}
return char.charCodeAt()

}
console.log(counterpartCharCode('A'))