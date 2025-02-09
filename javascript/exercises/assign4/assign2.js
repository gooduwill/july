function reverseWords(str){ 
let result1=[]
let result=str.split(' ')
for(let i=result.length-1;i>=0;i--)
{
    result1=result1+result[i]
}
return result1.toString()
}
console.log(reverseWords('the sky is blue'))