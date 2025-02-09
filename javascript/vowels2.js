const str='dctacademy'
const vowels='aeiou'
let count=0;
for(let i=0;i<str.length;i++){
    if(vowels.includes(str[i].toLowerCase())){
        count++
    }
}
console.log(`the ${vowels} count is ${count}`)