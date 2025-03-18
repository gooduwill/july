import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

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
    axios.get(`http://localhost:3010/users/prof/${searchwarea}`)
    .then((response)=>{
      const result=response.data;
      console.log('result',result)
      setUser1(result)


    })
    .catch((err)=>{
     console.log(err)
     setUser1(null)
    })


  },[searchwarea])
  const handleProfEdit = (id) => {
    profDispatch({ type: "prof_edit_id", payload: id });
    navigate("/ProfessorAcc");
  };

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

      {user1.length > 0 ? (
  user1.map((prof) => (
    <div key={prof._id}>
      <p><strong>Name:</strong> {prof.name2}</p>
      <p><strong>Workarea:</strong> {prof.workarea}</p>
      <p><strong>Experience:</strong> {prof.area}</p>
      <img src={prof.image} alt={prof.name2} width="100" />
      <br />
      <Link to={`/user-show1/${prof._id}`} style={{ marginLeft: "10px" }}>Show</Link>

    </div>
  ))
) : (
  searchwarea && <p>User not found.</p>
)}
  </div>
  )
}
