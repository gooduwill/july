function toScottishScreaming(str){
const vowels='aeiouAEIOU'
let result=''
for(let i=0;i<str.length;i++){
    if(vowels.includes(str[i])){
       
        result=result+'e'
    }
    else{
        result=result+str[i]
    }
}
return result.toUpperCase()
}
console.log(toScottishScreaming('hello World'))