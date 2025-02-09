const express = require('express')
const port = 4000
const app = express()
app.use(express.json())
const employees = [
    { "id": 1, "name": "John Doe", "position": "Software Engineer" },
    { "id": 2, "name": "Jane Smith", "position": "Product Manager" },
    { "id": 3, "name": "Mike Johnson", "position": "UX Designer" }
]
const clients = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'orange' },
    { id: 3, name: 'mango' }]
app.get('/my-clients:id', (req, res) => {
    const id = req.params.id
    const employee = clients.find(ele => ele.id == id)
    if (employee) {
        res.json(employee)
    }
    else {
        res.status(404).json({})
    }
})

app.post('/create-employee', (req, res) => {
    const body = req.body
    employees.push(body)
    res.status(201).json(body)
})

app.get('/list-employees', (req, res) => {
    res.json(employees)
})

app.get('/emp-details:id', (req, res) => {
    const id = req.params.id
    const employee = employees.find(ele => ele.id == id)
    if (employee) {

        res.json(employee)
    }
    else {
        res.status(404).json({})
    }
})
app.delete('/delete-employee/:id', (req, res) => {
    const id = req.params.id
    const index = employees.findIndex((ele) => {
        return ele.id == Number(id)

    })
    if (index >= 0) {
        const result=employees.splice(index, 1)
        res.json(result[0])
    }
    else {
        res.status(404).json({ message: 'record not found' })
    }
})

app.put('/update-employee/:id',(req,res)=>{
const id=req.params.id
const body=req.body
const employee=employees.find(ele=> ele.id==Number(id))
if(employee){
    Object.assign(employee,body)
    res.json(employee)

}else{
    res.status(404).json({error: 'record not found'})
}


})


app.listen(port, () => {

    console.log('express is running', port)
})