const city='bangalore'
const vowels='aeiouAEIOU'
let result=''
for(let i=0;i<city.length;i++){
    if(vowels.includes(city[i])){
        result=result+city[i]
    }
}
console.log(result)