function countDs(str){
let count=0
for(let i=0;i<str.length;i++){
    if(str[i].toUpperCase()=='D'){
        count++
    }
}
return count


}
console.log(countDs('MY friend Dylan got distracted in school'))
console.log(countDs('Debris was scattered all over the yard'))

