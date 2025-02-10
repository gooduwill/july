import AuthContext from "../context/AuthContext";
import { useContext } from "react";
export default function Account(){
    const {userState}=useContext(AuthContext);
    return(
        <div>
            <h1>Account</h1>
            <p>id-{userState.user._id}</p>
            <p>email-{userState.user.email}</p> 
            <p>Role-{userState.user.role}</p> 

            

            

        </div>
    )
}