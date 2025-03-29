import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axiosInstance from "./axiosInstance";

export default function Professor() {
  const { profDispatch, prof } = useContext(AuthContext);
  const [workarea, setWorkarea]=useState('');
  const [user1, setUser1]=useState([]);
  const [searchwarea, setSearchwarea]=useState(null);
  const navigate = useNavigate();
  const handleSearch=(e)=>{
    e.preventDefault();
    setSearchwarea(workarea);
  }
  useEffect(()=>{
    if(!searchwarea){
      return
    }
    axiosInstance.get(`/users/prof/${searchwarea}`)
    .then((response)=>{
      const result=response.data;
      console.log('result',result)
      setUser1(result)


    })
    .catch((err)=>{
     console.log(err)
     setUser1([])
    })


  },[searchwarea])
  //const handleProfEdit = (id) => {
    //profDispatch({ type: "prof_edit_id", payload: id });
    //navigate("/ProfessorAcc");
  //};

  return (
    <div>
    <h1>Professor's List</h1>
    <form>
        <input
          type="text"
          value={workarea}
          onChange={(e) => setWorkarea(e.target.value)}
          placeholder="Enter professor workarea"
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>


    <div>
      {user1.length > 0 ? (
     user1.map((ele) => (
     <div key={ele._id}>
      <p><strong>Name:</strong> {ele.name2}</p>
      <p><strong>Workarea:</strong> {ele.workarea}</p>
      <p><strong>Experience:</strong> {ele.area}</p>
      <img src={ele.image} alt={ele.name2} width="100" />
      <br />
      <Link to={`/user-show1/${ele._id}`} style={{ marginLeft: "10px" }}>Show</Link>

    </div>
  ))
) : (
  searchwarea && <p>Professor not found.</p>
)}
  </div>
  </div>
  )
}
