
import './App.css';
import axios from "axios";
import {Routes,Route,Link,useNavigate} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import Account from './pages/Account';
import Project1 from './pages/Project1';
import ProjectDetail from './pages/ProjectDetail';
import ProjectList from './pages/ProjectList';
import Professor from './pages/Professor';
import ProfessorAcc from './pages/ProfessorAcc';
import AuthContext from './context/AuthContext';
import AuthProvider from './component/AuthProvider';

import { useContext,useState,useEffect } from 'react';
import PrivateRoute from './component/PrivateRoute';
import ProfessorDetails from './pages/ProfessorDetails';

function App(props) {
  const {userState,handleLogout}=useContext(AuthContext);
  const {user2State,user2Dispatch}=useContext(AuthContext);
  const navigate=useNavigate();


 
  
  return (
    <div className="App">
      <h1>Project</h1>
      <ul id="top-nav">
      <li><Link to="/">Home</Link></li>

        {!userState.isLoggedIn?(
          <> 
          <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>


          </>
        ):(
          <>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/dashboard">DashBoard</Link></li>
        <li><Link to="/professor">Professor's List</Link></li>
        <li><Link to="/professorAcc">Professor's account</Link></li>

        <li><Link to="project1">Project1</Link></li>
        <li><Link to="projectlist">ProjectList</Link></li>
        <li><button onClick={()=>{
          handleLogout();
          localStorage.removeItem('token');
          navigate('/');
        }}>logout</button></li>
          
          </>
        )}
        
      </ul>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/account" element={<PrivateRoute> <Account/></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashBoard/></PrivateRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/professor" element={<PrivateRoute><Professor/></PrivateRoute>} />
        <Route path="/professorAcc" element={<PrivateRoute><ProfessorAcc/></PrivateRoute>} />

        <Route path="/project1" element={<PrivateRoute><Project1/></PrivateRoute>} />
        <Route path="/projectlist" element={<PrivateRoute><ProjectList/></PrivateRoute>} />
        <Route path="/user-show/:id" element={<ProjectDetail />} />
        <Route path="/user-show1/:id" element={<ProfessorDetails />} />
        <Route path="/user-project1/:id" element={<Project1 />} />



        








      </Routes>
    </div>
  );
}

export default App;
