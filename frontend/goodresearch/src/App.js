
import './App.css';
import axios from "axios";
import {Routes,Route,Link,useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from './pages/Navbar';
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
import Hooter from './pages/Hooter';

function App(props) {
  const {userState,handleLogout}=useContext(AuthContext);
  const {user2State,user2Dispatch}=useContext(AuthContext);
  const navigate=useNavigate();
  const location = useLocation();
  const pagesWithBackground = ["/login", "/register"];




 
  
  return (
    <div
      className="App"
      style={
        pagesWithBackground.includes(location.pathname)
          ? {
              backgroundImage: "url('/download_cap.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100vh",
              width: "100%",
            }
          : {}
      }
    >
       <Navbar /> {/* Show Navbar on all pages */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<PrivateRoute> <Account /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/professor" element={<PrivateRoute><Professor /></PrivateRoute>} />
        <Route path="/professorAcc" element={<PrivateRoute><ProfessorAcc /></PrivateRoute>} />
        <Route path="/project1" element={<PrivateRoute><Project1 /></PrivateRoute>} />
        <Route path="/projectlist" element={<PrivateRoute><ProjectList /></PrivateRoute>} />
        <Route path="/user-show/:id" element={<ProjectDetail />} />
        <Route path="/user-show1/:id" element={<ProfessorDetails />} />
        <Route path="/user-project1/:id" element={<Project1 />} />
      </Routes>
    </div>
  );
}

export default App;