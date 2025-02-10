import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
export default function PrivateRoute(props){
    const {userState} =useContext(AuthContext);
if(userState.isLoggedIn){
    return props.children;

}
else{
    return <Navigate to="/login" replace />
}
}