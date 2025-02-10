//import logo from './logo.svg';
import {Routes,Route,Link} from "react-router-dom";
import AuthContext from "./context/AuthContext";
import AuthProvider from './context/AuthProvider';
import { use, useContext } from "react";
import './App.css';
import Home from './pages/Home';
import Account from './pages/Account';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Register from './pages/Register';
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AddProduct from "./pages/AddProduct";

function App(props) {
  const {userState, handleLogin, handleLogout}=useContext(AuthContext);
  const navigate=useNavigate();
  
  return (
    <div className="App">
     <h2>Oly1</h2>
     <ul id="top-nav">
      <li><Link to="/">Home</Link></li>
      {!userState.isLoggedIn ? (
        <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <button onClick={handleLogin}
          >Login</button>
        </>
      )
      :(
        <>
        <li><Link to="/dashBoard">DashBoard</Link></li> 
        {userState.user.role=='seller' && <li><Link to="/add-product">AddProduct</Link>  </li>    
 }
      <li><Link to="/Account">Account</Link></li>
      <button onClick={()=>{
        handleLogout();
        localStorage.removeItem('token');
        navigate('/')}}>Logout</button>      
      
        
        </>
      )}     
           
        

     </ul>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashBoard' element={<PrivateRoute>
        <DashBoard/>
      </PrivateRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/Account' element={<PrivateRoute>
        <Account/>
      </PrivateRoute>}/>
      <Route path='/add-product' element={<PrivateRoute permittedRoles={['seller']}><AddProduct/> </PrivateRoute>}/>





     </Routes>
      
    </div>
  );
}

export default App;
