import AuthContext from "../context/AuthContext";
import { useEffect, useReducer } from "react";
import userReducer from "../reducer/user-reducer";
import user2Reducer from "../reducer/user2-reducer"
import userReducer1 from "../reducer/user1-reducer"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import axiosInstance from "../pages/axiosInstance";

const initialState = {
  isLoggedIn: false,
  user: null
}
const userInitialState = {
  data: [],
  editId: null,
  serverErrors: null,
};
const profInitialState = {
  data: [],
  peditId: null,
  serverErrors: null,
};
/**
 * AuthProvider - React Context Provider Component for Authentication and App-wide State Management
 *
 * This component sets up and provides global authentication-related state and several application-wide data points 
 * using React's Context API and multiple useReducer/useState hooks. It manages:
 * 
 * - User login/logout state (`userState`)
 * - Secondary user data and edit state (`user2State`)
 * - Professor-related data (`prof`)
 * - Department list (`depart`)
 * - Application form post data (`applypost`)
 * 
 * Key responsibilities:
 * - On initial mount, checks for a stored token and fetches authenticated user data if present.
 * - Fetches and manages form submissions, professor list, and department list from the backend.
 * - Provides utility methods like `handleLogin`, `handleLogout`, and `handleEdit` for consumer components.
 * - Uses `AuthContext` to expose all states and functions to descendant components.
 * - Prevents page flash on reload by displaying a loading message until user data is resolved if a token exists.
 * 
 * Props:
 * - `props.children` - Any components nested within this provider, which will consume the provided context.
 */

function AuthProvider(props) {
  const [userState, userDispatch] = useReducer(userReducer, initialState);
  const [user2State, user2Dispatch] = useReducer(user2Reducer, userInitialState);
  const [prof, profDispatch] = useReducer(userReducer1, profInitialState);
  const [depart, setDepart] = useState([]);
  const [applypost, setApplypost] = useState([]);
  const navigate = useNavigate();


  const handleLogin = (user) => {
    userDispatch({ type: 'LOGIN', payload: { isLoggedIn: true, user: user } })
  }
  const handleLogout = () => {
    userDispatch({ type: 'LOGOUT', payload: { isLoggedIn: false, user: null } });

  }  
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        const response = await axiosInstance.get('/users/account', { headers: { Authorization: localStorage.getItem('token') } });
        handleLogin(response.data)
        console.log('response imp',response.data)
        
      }

    })();

  }, [])
  

  useEffect(() => {
    axiosInstance.get("/formsend1").then((response) => {
      const result = response.data;
      user2Dispatch({ type: "set_user", payload: result });
    });
  }, []);
  useEffect(() => {
    axiosInstance
      .get("/users/applypost")
      .then((response) => {
        const result = response.data;
        console.log("result", result);
        setApplypost(result);//using usestate
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/users/department")
      .then((response) => {
        const result = response.data;
        console.log("result", result);
        setDepart(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    const handleEdit = (id) => {
    user2Dispatch({ type: "set_edit_id", payload: id });
    navigate("/Project1"); // Navigate to the form for editing
  };
  
  const editData = user2State.editId//data of clicked student is saved to editData
    ? user2State.data.find((ele) => ele._id === user2State.editId)
    : null;

  useEffect(() => {
    console.log("Fetching professors..."); // Should appear in the console
    axiosInstance
      .get("/users/prof")
      .then((response) => {
        const result = response.data;
        profDispatch({ type: "set_prof", payload: result });
        console.log("professor names", result)
      }
      )
      .catch((err) => {
        console.log(err.message);
      });


  }, []);
  

  if (localStorage.getItem('token') && !userState.user) {  //to stop going to login after reload
    return <p>loading....</p>
  }
  return (
    <div>
      <AuthContext.Provider value={{ userState, userDispatch, user2State, editData, depart, applypost, prof, profDispatch, handleEdit, user2Dispatch, handleLogin, handleLogout }}>
        {props.children}
      </AuthContext.Provider>
    </div>
  )
}
export default AuthProvider;