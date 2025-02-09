
const employees = [
    {
      id: 1,
      name: "Alice Johnson",
      department: "Sales",
      experience: 5,
      skills: ["Negotiation", "Communication", "Customer Relationship Management"]
    },
    {
      id: 2,
      name: "Bob Smith",
      department: "IT",
      experience: 3,
      skills: ["JavaScript", "React", "Node.js"]
    },
    {
      id: 3,
      name: "Carol White",
      department: "Sales",
      experience: 7,
      skills: ["Sales Strategy", "Lead Generation", "Market Analysis"]
    },
    {
      id: 4,
      name: "David Brown",
      department: "IT",
      experience: 4,
      skills: ["Python", "Django", "Database Management"]
    },
    {
      id: 5,
      name: "Eva Green",
      department: "Sales",
      experience: 6,
      skills: ["Public Speaking", "Brand Management", "Digital Marketing"]
    }
  ];


// return employee names 
/*function employeeNames(employees){
  const result5=employees.map((ele)=>{
   return ele.name
  })
  return result5
}
console.log(employeeNames(employees)) // ie [ 'e1', 'e2', 'e3', 'e4', 'e5' ]

function employeeNames(employees,deptName){
    const result6=employees.filter((ele)=>{
     return ele.department==deptName
    })
    return result6
  }
  console.log(employeeNames(employees,'Sales')) // ie [ 'e1', 'e2', 'e3', 'e4', 'e5' ]*/
  // find total experience of the employees
function totalExperience(employees){
  const result7=employees.reduce((acc,cv)=>{
     return acc+cv.experience
  },0)
      return result7
}
console.log(totalExperience(employees)) // 25
