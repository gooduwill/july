
import './App.css';
import {Routes,Route,Link,useNavigate} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import Account from './pages/Account';
import Project1 from './pages/Project1';
import ProjectList from './pages/ProjectList';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';

function App(props) {
  const {userState,handleLogin,handleLogout}=useContext(AuthContext);
  const navigate=useNavigate();
  return (
    <div className="text-center">
      <h1>oly</h1>
      <ul  className='flex justify-center space-x-4 mb-4'>
      <li><Link to="/">Home</Link></li>

        {!userState.isLoggedIn?( 
          <> 
          <li><Link to="/login">Login</Link></li>
        <li><button onClick={handleLogin}>login</button></li>
        <li><Link to="/register">Register</Link></li>


          </>
        ):(
          <>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/dashboard">DashBoad</Link></li>
        
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
        <Route path="/account" element={<Account/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/project1" element={<Project1/>} />
        <Route path="/projectlist" element={<ProjectList/>} />
      </Routes>
    </div>
  );
}

export default App;
