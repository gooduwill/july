const username='goodwill'
const char='i'
let count=0;
for(let i=0; i<username.length;i++){
    if(username[i]==char){
        count++
    }
}
console.log(count)

const source='banglore',destination='mysore',distance=140,time='3 hours 30 mins'

console.log(`the distance between ${source} and ${destination} is ${distance} kms and the time taken to trael is ${time}.`)