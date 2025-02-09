const express = require('express')
const port = 3077
const app = express()



const tasks = [
    { id: 1, title: "Setup Project", description: "Initialize the project structure", status: "completed" },
    { id: 2, title: "Install Dependencies", description: "Install necessary npm packages", status: "completed" },
    { id: 3, title: "Setup Express Server", description: "Create  and configure Express server", status: "in-progress" },
    { id: 4, title: "Create Task Model", description: "Define the task data structure", status: "in-progress" },
    { id: 5, title: "Implement Task API", description: "Develop the API endpoints for tasks", status: "pending" },
    { id: 6, title: "Write Unit Tests", description: "Create unit tests for the API", status: "pending" },
    { id: 7, title: "Setup Error Handling", description: "Implement error handling in the server", status: "pending" },
    { id: 8, title: "Document API", description: "Write documentation for the API endpoints", status: "pending" },
    { id: 9, title: "Setup Linter", description: "Configure ESLint for code quality", status: "completed" },
    { id: 10, title: "Deploy Server", description: "Deploy the server to a cloud provider", status: "pending" }
]

app.get('/GET/tasks', (req, res) => {
    res.json(tasks)
})

app.get('/GET/tasks:id', (req, res) => {
    const id = req.params.id
    const task = tasks.find(ele => ele.id == id)
    if (task) {

        res.json(task)
    }
    else {
        res.status(404).json({})
    }
})

app.get('/GET/tasks/status/:status', (req, res) => {
    const status = req.params.status
    const task = tasks.filter(ele => ele.status == status)
    if (task) {

        res.json(task)
    }
    else {
        res.status(404).json({})
    }
})
app.post('/create-employee', (req, res) => {
    const newEmployee = req.body
    //newEmployee.id=Number(Date.now())
    newEmployee.id = Number(new Date())

    tasks.push(newEmployee)
    res.status(201).json({ message: 'employee created successfully', newEmployee })
    //const body=req.body
    //body.id=Number(new Date())
    //tasks.push(body)
    //res.json(body)


})
app.delete('/delete/tasks/:id', (req, res) => {
    const id = req.params.id
    const index = tasks.findIndex((ele) => {
        return ele.id == Number(id)

    })
    if (index >= 0) {
        const result = tasks.splice(index, 1)
        res.json(result[0])
    }
    else {
        res.status(404).json({ message: 'record not found' })
    }
})

app.put('/Put/tasks/:id/status', (req, res) => {
    const id = req.params.id
    // const status=req.params.status
    const body = req.body
    const employee = tasks.find(ele => (ele.id === Number(id)))
    if (employee) {
        Object.assign(employee, body)
        res.json(employee)

    } else {
        res.status(404).json({ error: 'record not found' })
    }


})

app.listen(port, () => {
    console.log('express server is running on port', port)

})