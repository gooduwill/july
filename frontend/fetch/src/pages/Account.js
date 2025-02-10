import { useContext } from "react"
import AuthContext from "../context/AuthContext";
export default function Account(){
    const {userState}=useContext(AuthContext)


    return(
        <div>
            <h2>Account page</h2>
            <p>id-{userState.user._id}</p>
            <p>email-{userState.user.email}</p> 
            <p>Role-{userState.user.role}</p> 

            
        </div>
    )
}