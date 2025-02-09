const f4=function(){

console.log(this)
const person={
    name:'adam',
    greet:function(){
        return this

    }
}
console.log(person.greet())

}
console.log(f4())
