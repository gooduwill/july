import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "../App.css"
import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export default function ProjectList({ user, userDispatch, onEdit }) {
  const navigate = useNavigate();
  const {user2State, user2Dispatch,handleEdit}=useContext(AuthContext)
  const [currentPage, setCurrentPage]=useState(1);
  const [name, setName]=useState('');
  const [user2, setUser2]=useState([]);
  const [searchName, setSearchName]=useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Track sorting order
  const MySwal = withReactContent(Swal);

  
  
  const itemsPerPage=5;
  const handleSearch=(e)=>{
    e.preventDefault();
    setSearchName(name);
  }
  /*useEffect(()=>{
  console.log("user2State:", user2State); // Debugging log
  if (user2State && Array.isArray(user2State.data)) {
    setUser2(user2State.data);
  } else {
    setUser2([]); // Ensure it's always an array
  }
  },[user2State])*/
  useEffect(() => {
    if (user2State?.data) {
      setUser2([...user2State.data]); // Ensure a new array reference
    }
  }, [user2State]);


  // Sorting function
  /*const handleSort = () => {
    const sortedUsers = [...user2].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setUser2(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
  };*/
  const handleSort = () => {
    const sortedUsers = [...user2].sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  
    setUser2(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  


  


  const handleRemove = (_id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/formsend1/${_id.trim()}`, { headers: { Authorization: localStorage.getItem("token") } })
          .then(() => {
            user2Dispatch({ type: "remove_user", payload: _id });
  
            // Show success message
            MySwal.fire("Deleted!", "The student has been removed.", "success");
          })
          .catch((err) => console.log(err.message));
      }
    });
  };
  const totalUsers = user2State.data?.length || 0;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
 // const currentUsers = user2State.data?.slice(startIndex, endIndex) || [];
 const currentUsers = user2.slice(startIndex, endIndex);


  /*const filteredUsers = Array.isArray(user2) 
  ? searchName
    ? user2.filter((ele) =>
        ele.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : user2.slice(startIndex, endIndex)
  : [];
  console.log("filtered user",filteredUsers) */
  const filteredUsers=user2.filter((ele)=> ele.name==name)


  return (
    <div className="herr">
      <h1>Student List</h1>
      {/* Sorting Button */}
      <button onClick={handleSort}>
        Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <ul>
      {currentUsers.map((ele) => (
          <li key={ele._id} className="container">
            <Link to={`/user-show/${ele._id}`}>{ele.name}</Link>
            <button
              onClick={() => handleRemove(ele._id)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
            <button
              onClick={() => handleEdit(ele._id)}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      
            {/* Pagination Controls */}
            <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div>
        
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>
      </div>
      {filteredUsers.length > 0 ? (
  filteredUsers.map((ele) => (
    <div key={ele._id}>
      <p><strong>Name:</strong> {ele.name}</p>
      <p><strong>Professor under whom applied</strong> {ele?.name2}</p>
    </div>
  ))
) : (
  searchName && <p>Student not found.</p>
)}
      

    </div>
  );
}
