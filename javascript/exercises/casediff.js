function caseDiff(str){
let capital='',small=''
for(let i of str){
if(i.charCodeAt()>=65 && i.charCodeAt()<=90){
    capital=capital+i.toUpperCase()
}
else{
    small=small+i.toLowerCase()
}

}
return capital+small







}
console.log(caseDiff('JaVaSCriPT'))
