

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

// find the employee whose id is 3
function findEmployee(employees, empId){

const result=employees.find((ele)=>{
return ele.id==empId
})
if(result)
{ return result.name

}
else{
  return 'employee not found'
}}
console.log(findEmployee(employees, 3))  // {}
console.log(findEmployee(employees, 30)) // undefined


// find the employee whose 

