const express = require('express');
const port = 3090;
const app = express();
app.use(express.json())
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
// --> /tasks
app.get('/tasks', (req, res)=>{
   res.json(tasks);
})


// --> /tasks/:id
app.get('/tasks/:id',(req, res)=>{
   
    const onlyId = req.params.id;
    const allId = tasks.find(ele => ele.id == onlyId)

    if(allId){
       res.json(allId)
    }else{
        res.status(404).json({})
    }
})


// --> /tasks/:status
app.get('/tasks/status/:status',(req, res)=>{
   
    const onlyStatus = req.params.status
    console.log("Requested Status " + onlyStatus)

    const allStatus = tasks.filter(ele => ele.status == onlyStatus)
    console.log(`Matching Status ${allStatus}`)

    if(allStatus.length > 0){
       res.json(allStatus)
    }else{
        res.status(404).json({ })
    }
})


// --> Add a new task - POST

app.post('/tasks', (req, res) => {
    const body = req.body
    body.id = Number(new Date())
    tasks.push(body)
    res.json(body)
    // res.status(201).json(body)
})


// --> Edit/Update Task -- > /task/:id/status --> PUT

app.put('/tasks/:id/status', (req, res) =>{
    const id = req.params.id
    const body = req.body
    const taskIndex = tasks.findIndex(ele => {
        return ele.id === Number(id)
    })
    if(taskIndex >= 0){
        Object.assign(tasks[taskIndex], body)
        res.json(tasks[taskIndex])
        // res.status(200).json({message: 'Record Updated'})
    }else{
        res.status(404).json({error: 'Record Not Found'})
    }
})


// --> Delete Task -- > /task/:id/status --> DELETE
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id
    const index = tasks.findIndex(ele => {
        return ele.id === Number(id);
    })
    if(index >= 0){
      const result = tasks.splice(index, 1);
      res.json(result[0]);
    }else{
        res.status(404).json({ message: 'Record Not Found'})
    }
})


app.listen(port, ()=>{
    console.log(`Server running on a port ${port}`);
})