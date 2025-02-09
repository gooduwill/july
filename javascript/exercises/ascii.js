function asciiCapitalize(str){
let result=''
for(let i=0;i<str.length;i++){
    if(str[i].charCodeAt()%2==0){
          result=result+str[i].toUpperCase()
    } else{
        result=result+str[i].toLowerCase()
    }
    
}
return result
}
 let result1=asciiCapitalize('to be or not to be')
 console.log(result1)
 let result2=asciiCapitalize('THE LITTLE MERMAID')
 console.log(result2)
 let result3=asciiCapitalize('oH wHat a Beautiful morning')
 console.log(result3)











asciiCapitalize('to be or not to be')


