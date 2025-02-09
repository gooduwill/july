const student={
    name:'david',
    class: 'v' ,
    rollNo:13
}
console.log(Object.keys(student))
let result=''
for(let key in student){
    result=result+key
}
console.log(result)
delete student.rollNo
console.log(student)
arr={a:1,b:2,c:3}
console.log(Object.values(arr).reduce((acc,cv)=>acc+cv,0))