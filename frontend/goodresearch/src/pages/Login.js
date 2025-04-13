import "../App.css"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./axiosInstance"
/**
 * Login - Handles the user login process including form validation, authentication, and error handling.
 *
 * This component allows users to log in to the platform by entering their email and password.
 * It includes client-side validation for required fields, submits the login request to the backend,
 * handles the server's response (successful login or error), and redirects the user to the dashboard upon successful login.
 *
 * Features:
 * - Form with fields for email and password.
 * - Client-side validation to ensure both fields are filled before submission.
 * - Server-side error handling for invalid credentials or other issues.
 * - Stores the authentication token in localStorage upon successful login.
 * - Redirects the user to the dashboard page (`/dashBoard`) after a successful login.
 * - Displays error messages using `toast` notifications for both client and server-side errors.
 *
 * Hooks used:
 * - `useState` to manage form data, client and server errors.
 * - `useContext` to access `handleLogin` function from `AuthContext` to store the logged-in user's data.
 * - `useNavigate` for redirecting to the dashboard after a successful login.
 *
 * @returns JSX rendering the login form and handling form submission.
 */

export default function Login() {
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",


    });
    const [clientErrors, setClientErrors] = useState(null);
    const [serverErrors, setServerErrors] = useState([]);
    const runClientValidations = () => {
        const errors = {};
        if (formData.password.trim().length === 0) {
            errors.password = 'password is required'

        }
        if (formData.email.trim().length === 0) {
            errors.email = 'email is required'
        }
                setClientErrors(errors);
        return errors;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const clientErrors = runClientValidations();
        console.log(formData)
        if (Object.keys(clientErrors).length == 0) {
            try {
                const response = await axiosInstance.post('/users/login', formData)
                //we got token
                localStorage.setItem('token', response.data.token)
                //we have to send token to authenticate after verification, through request object we get data from account..if its loggedin then you will get data
                const userResponse = await axiosInstance.get('/users/account', { headers: { Authorization: localStorage.getItem('token') } })
                // we got user data from account
                handleLogin(userResponse.data)
                toast.success("Login successful! Redirecting...", { position: "top-right" });

                setTimeout(() => {
                    navigate('/dashBoard')

                }, 2000);

            } catch (err) {
                  if (err.response) {

                    setServerErrors(Array.isArray(err.response.data.errors) ? err.response.data.errors : [{ msg: err.response.data.errors }]);
                    if (Array.isArray(err.response.data.errors)) {
                        err.response.data.errors.forEach(error => {
                            toast.error(error.msg, { position: "top-right" });
                        });
                    } else {
                        toast.error(err.response.data.errors, { position: "top-right" });
                    }
                } else {
                    setServerErrors('something went wrong')
                    toast.error("Something went wrong!", { position: "top-right" });

                }


            }
            setClientErrors({})
        } else {
            setClientErrors(clientErrors)
            Object.values(clientErrors).forEach(error => {
                toast.error(error, { position: "top-right" });
            });


        }
    }


    return (
        <>
            <h2>Login page</h2>

            <form onSubmit={handleSubmit}>
                <input type="email" value={formData.email} className="login-input" onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="enter email" /> <br />
                {/*  {clientErrors && <p className="clientErrors">{clientErrors.email}</p>} */}

                <input type="password" value={formData.password} className="login-input" onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="enter password" /> <br />
                {/* {clientErrors && <p className="clientErrors">{clientErrors.password}</p>} */}



                <input type="submit" className="login-button" />
            </form>
        </>







    )
}