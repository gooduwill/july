import AuthContext from "../context/AuthContext";
import { useEffect, useReducer } from "react";
import userReducer from "../reducer/user-reducer";
import { useState } from "react";
import axios from 'axios';
const initialState={
    isLoggedIn:false,
    user1:null
}
function AuthProvider(props){
    const [userState, userDispatch]= useReducer(userReducer,initialState);

    const handleLogin=(user)=>{
        userDispatch({type:'LOGIN',payload:{isLoggedIn:true, user1:user}})
    }
    const handleLogout=()=>{
        userDispatch({type:'LOGOUT',payload:{isLoggedIn:false, user1:null}});

    }  //spreading state so that isLoggedIn and user1 will be available
    
    
    return(
        <div>
            <AuthContext.Provider value={{userState,userDispatch,handleLogin,handleLogout}}>/
            {props.children}
            </AuthContext.Provider>
        </div>
    )
}
export default AuthProvider;