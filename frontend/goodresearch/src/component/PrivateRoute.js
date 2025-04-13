import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
/**
 * PrivateRoute - A protected route component for role-based access control
 *
 * This component restricts access to its child components based on user authentication status
 * and optional role-based authorization. It uses `AuthContext` to determine the current user's state.
 *
 * Behavior:
 * - If no token is found and the user is not logged in, the user is redirected to the login page.
 * - If `permittedRoles` is provided:
 *    - Grants access only if the current user's role is included in `permittedRoles`.
 *    - Otherwise, displays an "Unauthorized" message.
 * - If no `permittedRoles` are provided and the user is logged in, grants access.
 *
 * Props:
 * - `props.children` - The component(s) to render if access is allowed.
 * - `props.permittedRoles` (optional) - An array of allowed user roles for the route.
 */


export default function PrivateRoute(props){
    const {userState}=useContext(AuthContext);
    //user is not loggedin and token is not present
    if(!localStorage.getItem('token') && !userState.user){
        return<Navigate to="/login" replace />
    }
    else if(props.permittedRoles && props.permittedRoles.includes(userState.user.role)){
        return props.children
    }
    else if(props.permittedRoles && !props.permittedRoles.includes(userState.user.role)){
        return <p>Unauthorized</p>
    }
    else if(userState){//assuming user is loggedIn
        return props.children;
  
 
    } 

}