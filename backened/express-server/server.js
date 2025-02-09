const express=require('express')
const port=3050
const app=express()
const employees = [
    { "id": 1, "name": "John Doe", "position": "Software Engineer" },
    { "id": 2, "name": "Jane Smith", "position": "Product Manager" },
    { "id": 3, "name": "Mike Johnson", "position": "UX Designer" }]
    const clients=[
        {id:1, name:'apple'},
        {id:2, name:'orange'},
        {id:3, name:'mango'}]
 app.get('/my-clients',(req,res)=>{
res.json(clients)

 })

    app.get('/list-employees',(req,res)=>{
    res.json(employees)

    })
app.listen(port,()=>{

console.log('express is running',port)
})