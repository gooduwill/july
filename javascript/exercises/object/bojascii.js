function getAscii(str){

const result={}
for(let char of str){
    result[char]=char.charCodeAt()
   
}
return result
}
console.log(getAscii('abc'))
console.log(getAscii('cde'))