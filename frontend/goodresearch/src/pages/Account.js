import AuthContext from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/**
 * Account - Displays user account information and links professor users to their editable profile
 *
 * This component accesses the current logged-in user's information and the list of professors
 * via `AuthContext`. If the logged-in user's email matches an entry in the professor list,
 * it identifies and stores that matched professor.
 *
 * Features:
 * - Retrieves and matches the logged-in user with a professor based on email.
 * - Provides a handler to dispatch the matched professor's ID and navigate to the Professor Account page.
 *
 * Hooks used:
 * - `useContext(AuthContext)` to access user state, professor data, and dispatch method.
 * - `useEffect` to run the matching logic whenever professor data or user email changes.
 * - `useState` to store the matched professor entry.
 * - `useNavigate` for programmatic navigation.
 */

export default function Account() {
    const { userState } = useContext(AuthContext);
    const { profDispatch, prof } = useContext(AuthContext);
    const navigate = useNavigate();
    const [matchedProf, setMatchedProf] = useState(null);

    useEffect(() => {
        if (prof?.data?.length > 0 && userState?.user?.email) {
            const foundProf = prof.data.find((ele) => ele.email === userState.user.email);//find prof by loggedin email
            setMatchedProf(foundProf || null);
        }
    }, [prof.data, userState.user.email]);



    const handleProfEdit = () => {
        if (matchedProf) {
            profDispatch({ type: "prof_edit_id", payload: matchedProf._id });
            navigate("/ProfessorAcc");
        }
    }

    return (
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
                <p>...</p>
            )}



        </div>
    )
}

