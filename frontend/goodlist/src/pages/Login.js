import "../App.css"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
export default function Login(){
    const navigate=useNavigate();
    const {handleLogin}=useContext(AuthContext);
    const [formData, setFormData]=useState({
        email:"",
        password:"",
        
    
    });
    const [clientErrors, setClientErrors]=useState(null);
    const [serverErrors, setServerErrors]=useState(null);
    const clientValidationsErrors={};
    const runClientValidations=()=>{
        if(formData.password.trim().length===0){
            clientValidationsErrors.password='password is required'
        
        }
        if(formData.email.trim().length===0){
            clientValidationsErrors.email='email is required'
  
        }
        //if(formData.role.trim().length===0){
            //clientValidationsErrors.role='role is required'

       // }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        runClientValidations();
        console.log(formData)
        if(Object.keys(clientValidationsErrors).length==0){
            try{
                const response=await axios.post('http://localhost:3010/users/login', formData)
                //console.log(response.data.token)
                localStorage.setItem('token',response.data.token)
                const userResponse= await axios.get('http://localhost:3010/users/account',{headers:{Authorization:localStorage.getItem('token')}})
                console.log(userResponse.data)
                handleLogin(userResponse.data)
                navigate('/dashBoard')
                
                
 
            } catch(err){
               // console.log(err)

                setServerErrors(err.response.data.errors)
      
            }
            setClientErrors({})
        } else{
            setClientErrors(clientValidationsErrors)

  
        }
    }


    return(
        <>
            <h2>Login page</h2>
            {serverErrors && (
                <div>
                    <b>{serverErrors}</b>
                    
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input type="email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})}
                placeholder="enter email"/> <br/>
                {clientErrors && <p className="clientErrors">{clientErrors.email}</p>}

                <input type="password" value={formData.password} onChange={(e)=> setFormData({...formData, password:e.target.value})}
                placeholder="enter password"/> <br/>
               {clientErrors && <p className="clientErrors">{clientErrors.password}</p>}

               

               <input type="submit"/>
               </form>
               </>





                
        
    )
}