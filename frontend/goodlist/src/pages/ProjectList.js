import { useState } from "react"
export default function ProjectList(){
    const [form,setForm]=useState({
        name:'',
        email:''
    })
    const handleSubmit=(e)=>{
        e.preventDefault();

    }
    return(
        <div>
            <h1>ProjectList</h1>
            <form onSubmit={handleSubmit}>

            <input type="text"  value={form.name} onChange={(e)=>{setForm({...form, name:e.target.value})}} />
            </form>
        </div>
    )
}