import "../App.css"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: ""

    });
    const [clientErrors, setClientErrors] = useState(null);
    const [serverErrors, setServerErrors] = useState(null);
    const clientValidationsErrors = {};
    const runClientValidations = () => {
        if (formData.password.trim().length === 0) {
            clientValidationsErrors.password = 'password is required'

        }
        if (formData.email.trim().length === 0) {
            clientValidationsErrors.email = 'email is required'

        }
        if (formData.role.trim().length === 0) {
            clientValidationsErrors.role = 'role is required'

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        runClientValidations();
        console.log(formData)
        if (Object.keys(clientValidationsErrors).length == 0) {
            try {
                const response = await axiosInstance.post('/users/register', formData)
                console.log('check response',response.data)
                navigate('/login');

            } catch (err) {
                setServerErrors(err.response.data.errors)

            }
            setClientErrors({})
        } else {
            setClientErrors(clientValidationsErrors)


        }
    }


    return (
        <>

            <h2>Register page</h2>
            {serverErrors && (
                <div>
                    <h3>Server Error</h3>
                    <ul>
                        {serverErrors.map((ele, i) => {
                            return <li key={i}>{ele.msg}</li>

                        })}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">

                <input type="email" className="register-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="enter email" /> <br />
                {clientErrors && <p className="clientErrors">{clientErrors.email}</p>}

                <input type="password" className="register-input" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="enter password" /> <br />
                {clientErrors && <p className="clientErrors">{clientErrors.password}</p>}

                <input type="radio" name="role" value="professor" id="professor" onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                <label htmlFor="professor">Professor</label>

                <input type="radio" name="role" value="user" id="user" onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                <label htmlFor="user">user</label> <br />
                {clientErrors && <p className="clientErrors">{clientErrors.role}</p>}

                <input type="submit" className="register-button" />

            </form>


        </>







    )
}