import axios from 'axios'
import {useState} from "react"
export default function TaskForm({handleAddTask}){
    const [title, setTitle]= useState([])
    const [description, setDescription]= useState([])
    const [status, setStatus]= useState([])


    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            title:title,
            description:description,
            status:status
        }
        axios.post('http://localhost:3029/task',formData)
        .then((response)=>{
          const result=response.data
          handleAddTask(result)
          setTitle('')
          setDescription('')
          setStatus('')
        })
        .catch((err)=>{
          console.log(err)
        })
            

    }


    return(
        <div>
            <h1>Add Task</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title"> Title</label>
            <input type="text"
                value={title}
                onChange={(e)=> {setTitle(e.target.value)}}
                id="title"
            />
           <label htmlFor="description"> Description</label>
            <input type="text"
                value={description}
                onChange={(e)=> {setDescription(e.target.value)}}
                id="description"
            />
            <label htmlFor="status"> Status</label>
            <input type="text"
                value={status}
                onChange={(e)=> {setStatus(e.target.value)}}
                id="status"
            />
            <input type="submit"/>
            </form>
            </div>
    )
}