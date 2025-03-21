import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import "../App.css"
import axiosInstance from "./axiosInstance";


export default function ProjectList({ user, userDispatch, onEdit }) {
  const navigate = useNavigate();
  const {user2State, user2Dispatch,handleEdit}=useContext(AuthContext)
  const [currentPage, setCurrentPage]=useState(1);
  const itemsPerPage=5;

  const handleRemove = (_id) => {
    const userConfirm = window.confirm("Are you sure you want to remove this?");
    if (userConfirm) {
      axiosInstance
        .delete(`/formsend1/${_id.trim()}`,{headers:{Authorization:localStorage.getItem('token')}})
        .then((response) => {
          user2Dispatch({ type: "remove_user", payload: _id });
          navigate("/ProjectList"); // Optionally, this can be omitted since the state will update automatically
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const totalUsers = user2State.data?.length || 0;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = user2State.data?.slice(startIndex, endIndex) || [];

  return (
    <div className="herr">
      <h1>Project List</h1>
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

    </div>
  );
}
