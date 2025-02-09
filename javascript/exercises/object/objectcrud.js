const employee1={
    id: 1,
    name: 'Alice jhonson',
    department: 'Sales',
    experience: 5,
    skills: ['negotitaion','communication','relation']
}
console.log(employee1.experience)
console.log(employee1['experience'])
//console.log(employee1.age) undefined
employee1.city='bangalore'
console.log(employee1)
delete employee1.skills
console.log(employee1)
//modify exp.
employee1.experience=employee1.experience+2
console.log(employee1)

