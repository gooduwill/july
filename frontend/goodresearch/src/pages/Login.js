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
    const [serverErrors, setServerErrors]=useState([]);
    //const clientValidationsErrors={};
    const runClientValidations=()=>{
        const errors={};
        if(formData.password.trim().length===0){
            errors.password='password is required'
        
        }
        if(formData.email.trim().length===0){
            errors.email='email is required'
  
        }
        //if(formData.role.trim().length===0){
            //clientValidationsErrors.role='role is required'

       // }
       setClientErrors(errors);
       return errors;
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
       // runClientValidations();
       const clientErrors = runClientValidations();

        console.log(formData)
        if(Object.keys(clientErrors).length==0){
            try{
                const response=await axios.post('http://localhost:3010/users/login', formData)
                console.log(response.data.token)
                localStorage.setItem('token',response.data.token)
                const userResponse= await axios.get('http://localhost:3010/users/account',{headers:{Authorization:localStorage.getItem('token')}})
                console.log('user response',userResponse.data)
                handleLogin(userResponse.data)
                navigate('/dashBoard')
                
                
 
            } catch(err){
               // console.log(err)
               if(err.response){

                setServerErrors(Array.isArray(err.response.data.errors) ? err.response.data.errors : [{ msg: err.response.data.errors }]);
            }else{setServerErrors('something went wrong')}

      
            }
            setClientErrors({})
        } else{
            setClientErrors(clientErrors)

  
        }
    }


    return(
        <>
            <h2>Login page</h2>
            {serverErrors && Array.isArray(serverErrors) ? (
    <div>
        {serverErrors.map((error, index) => (
            <p key={index} className="error-message">{error.msg}</p>
        ))}
    </div>
) : (
    <p className="error-message">{serverErrors}</p>
)}
            <form onSubmit={handleSubmit}>
                <input type="email" value={formData.email} className="login-input" onChange={(e)=>setFormData({...formData, email:e.target.value})}
                placeholder="enter email"/> <br/>
                {clientErrors && <p className="clientErrors">{clientErrors.email}</p>}

                <input type="password" value={formData.password} className="login-input" onChange={(e)=> setFormData({...formData, password:e.target.value})}
                placeholder="enter password"/> <br/>
               {clientErrors && <p className="clientErrors">{clientErrors.password}</p>}

               

               <input type="submit" className="login-button"/>
               </form>
               </>





                
        
    )
}