function vowelCount(str){
let count=0
let vowels='aeiou'
for(let i=0;i<str.length;i++){
    if(vowels.includes(str[i].toLowerCase())){
count++
    }
}
return count

}

let result1=vowelCount('dctacademy')
let result2=vowelCount('banglore')
console.log(result1)
console.log(result2)