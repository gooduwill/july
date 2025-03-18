import AuthContext from "../context/AuthContext";
import { useContext, useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";

export default function Account(){
    const {userState}=useContext(AuthContext);
    const { profDispatch, prof } = useContext(AuthContext);
    const navigate = useNavigate();
    const [matchedProf, setMatchedProf] = useState(null);

    useEffect(() => {
        if (prof?.data?.length > 0 && userState?.user?.email) {
            const foundProf = prof.data.find((ele) => ele.email === userState.user.email);
            setMatchedProf(foundProf || null);
        }
    }, [prof.data, userState.user.email]);



    const handleProfEdit = () => {
        if(matchedProf){
        profDispatch({ type: "prof_edit_id", payload: matchedProf._id });
        navigate("/ProfessorAcc");
      }}

    return(
        <div>
            <h1>Account</h1>
            <p>id-{userState.user._id}</p>
            <p>email-{userState.user.email}</p> 
            <p>Role-{userState.user.role}</p> 
            {matchedProf ? (
                <button onClick={handleProfEdit} style={{ marginLeft: "10px" }}>
                    Edit Professor
                </button>
            ) : (
                <p>No professor found with this email.</p>
            )}      

            

        </div>
    )
}
    
   