import { useEffect, useState } from "react";
import axios from "axios";

export default function Home(){
    
    const [form,setForm]=useState({
        name:'',
        email:''
    })
    const handleSubmit=(e)=>{
        e.preventDefault();

    }
    return(
        <div>
            <h1>HOME</h1>
            <form onSubmit={handleSubmit}>

            <input type="text"  value={form.name} onChange={(e)=>{setForm({...form, name:e.target.value})}} placeholder="Enter name" />
            </form>
        </div>
    )
}