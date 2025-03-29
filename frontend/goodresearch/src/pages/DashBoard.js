import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Hooter from "./Hooter";
export default function DashBoard() {
    /*const {userState}=useContext(AuthContext);
    if(!userState.user){
        return <p>Loading...</p>
    }*/


    return (
        <div>
            <h2>DashBoard page</h2>
            <h4>Welcome</h4>
            <h5>You're one step closer to your dream Professor!</h5>
            <Hooter />
        </div>
    )
}