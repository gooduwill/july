import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "../App.css"
import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
/**
 * ProjectList - A component for displaying and managing a list of students/projects.
 * 
 * This component fetches the list of students from the `user2State` context and provides functionalities to:
 * - Sort the students by name in ascending or descending order.
 * - Display a paginated list of students with options to navigate through pages.
 * - Search for students by name.
 * - Edit or remove a student from the list.
 * - Display a confirmation dialog before deleting a student.
 * 
 * Features:
 * - Pagination: Allows navigation through the list of students/projects, displaying a limited number per page.
 * - Sorting: Allows sorting of students by name in either ascending or descending order.
 * - Search: Filters the list of students based on a search term entered by the user (search by name).
 * - Edit/Remove: Provides options to edit or remove a student from the list, with a confirmation prompt for deletion.
 * 
 * Dependencies:
 * - `useContext` to access the `user2State` and `user2Dispatch` for state management.
 * - `useNavigate` for navigating to the details or edit page of a student.
 * - `withReactContent` and `Swal` for displaying SweetAlert popups (e.g., delete confirmation).
 * - `useState` and `useEffect` for managing and updating the state, including pagination, search, and sorting.
 * 
 * Intended for managing and displaying a list of students/projects with interactive controls for sorting, searching, and updating.
 */

export default function ProjectList() {
  const navigate = useNavigate();
  const { user2State, user2Dispatch, handleEdit } = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('');
  const [user2, setUser2] = useState([]);
  const [searchName, setSearchName] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Track sorting order
  const MySwal = withReactContent(Swal);



  const itemsPerPage = 5;
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchName(name);
  }
    useEffect(() => {
    if (user2State?.data) {
      setUser2([...user2State.data]); // Ensure a new array reference
    }
  }, [user2State]);


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
  const currentUsers = user2.slice(startIndex, endIndex);
  const filteredUsers = user2.filter((ele) => ele.name == name)


  return (
    <div className="herr">
      <h1>Student List</h1>
      {/* Sorting Button */}
      <button type="button" className="btn btn-sort-name" onClick={handleSort}>
        Sort by Name ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
      <ul>
        {currentUsers.map((ele) => (
          <li key={ele._id} className="container">
            <Link to={`/user-show/${ele._id}`}>{ele.name}</Link>
            <button type="button" className="btn btn-Remove"
              onClick={() => handleRemove(ele._id)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
            <button type="button" className="btn btn-Edit"
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
        <button type="button" className="btn btn-previous"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button type="button" className="btn btn-Next"
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
          <button style={{color:"red"}}type="submit" onClick={handleSearch}>
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
