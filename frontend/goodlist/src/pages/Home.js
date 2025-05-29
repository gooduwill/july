import { useEffect, useState } from "react";
import axios from "axios";

export default function Home(){
    const [users1,setUsers1]=useState([])
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            setUsers1(response.data)
        })
        .catch((err)=>{
            console.log(err)

        })

    },[])
    return(
        <div>
            <h1>Home</h1>
            {users1.map((ele)=>(
                <li key={ele.id}>{ele.name}</li>
            ))}

        </div>
    )
}