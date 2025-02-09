function asciiCapitalize(str){
const result={}
for(let char of str){
    if(char.charCodeAt()%2==0){
        result[char]=char.toUpperCase()
    }
    else{
        result[char]=char.toLowerCase()
    }
}
return result




}
console.log(asciiCapitalize('to be or not to be'))