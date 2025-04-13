import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axiosInstance from "./axiosInstance";
/**
 * Professor - Displays a list of professors based on a search criteria
 *
 * This component allows users to search for professors by their work area and displays the results.
 * The search is performed by entering a keyword into a search input field. The professor's name, 
 * work area, experience, and image are shown in the results. If no professors match the search, 
 * a "not found" message is displayed.
 *
 * Features:
 * - Users can search for professors by entering a work area.
 * - Displays a list of professors based on the search results, showing their name, work area, experience, and image.
 * - Uses `axiosInstance` to fetch data from the server based on the search query.
 * - Displays a "Professor not found" message if no professors match the search criteria.
 * - Uses `useNavigate` for handling navigation to individual professor profiles.
 *
 * Dependencies:
 * - `useContext` for accessing `AuthContext` to retrieve any needed global state (e.g., professor data).
 * - `useState` for managing local state (e.g., search query and results).
 * - `useEffect` to perform the search when the search query changes.
 *
 * Intended to be used in the professor listing section, allowing users to find and view professors.
 */

export default function Professor() {
  const { profDispatch, prof } = useContext(AuthContext);
  const [workarea, setWorkarea] = useState('');
  const [user1, setUser1] = useState([]);
  const [searchwarea, setSearchwarea] = useState(null);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchwarea(workarea);
  }
  useEffect(() => {
    if (!searchwarea) {
      return
    }
    axiosInstance.get(`/users/prof/${searchwarea}`)
      .then((response) => {
        const result = response.data;
        console.log('result', result)
        setUser1(result)


      })
      .catch((err) => {
        console.log(err)
        setUser1([])
      })


  }, [searchwarea])
  
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
