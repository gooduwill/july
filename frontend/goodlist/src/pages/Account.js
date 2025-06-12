import { useEffect, useState } from "react"
import axios from "axios"
export default function Account(){
    const [user,setUser]=useState([]);
     useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            setUser(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
     })
    
    return(
        <div>
            <h1>Account</h1>
            {user.map((ele)=>{
                return <li>{ele.name}</li>

            })}
            
        </div>
    )
}