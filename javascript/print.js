const city='varanasi'
const vowels='aeiouAEIOU'
let count=0
for(let i=0;i<city.length;i++){
  if(vowels.includes(city[i])){
    count++
  }
}
console.log(count)