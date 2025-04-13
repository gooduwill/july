import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import axiosInstance from "./axiosInstance";

const initialReview = {
  review: "",
  name3: "",
  rating: 0, // Ensure rating is part of the review
  professorId: "",
};
/**
 * ProfessorDetails - A component for displaying and submitting reviews for a specific professor
 *
 * This component displays detailed information about a specific professor, including their name, research area, 
 * and a form to submit reviews. The reviews are fetched from the server, filtered by the professor's ID, and displayed
 * below the form. Users can submit a review by entering a comment, a rating (1-5 stars), and their name.
 * After submission, the new review is added to the UI and sent to the server.
 *
 * Features:
 * - Displays professor details such as name and research area.
 * - Allows users to submit a review for the professor, including a star rating.
 * - Fetches and displays existing reviews for the selected professor.
 * - Updates the UI in real-time by adding new reviews after submission.
 *
 * Dependencies:
 * - `useContext` to access the `AuthContext` for professor data.
 * - `useParams` to get the professor's ID from the URL.
 * - `useState` to manage form data, reviews, and current professor data.
 * - `useEffect` to fetch reviews for the selected professor when the component mounts.
 *
 * Intended to be used by users who want to view and submit reviews for professors.
 */

export default function ProfessorDetails() {
  const { prof } = useContext(AuthContext);
  const [form1, setForm1] = useState(initialReview);
  const [add, setAdd] = useState([]); // Holds reviews for the specific professor
  const { id } = useParams(); // Current professor ID
  const users = prof.data.find((ele) => ele._id === id);

  useEffect(() => {
    axiosInstance
      .get(`/users/review?professorId=${id}`)
      .then((response) => {
        setAdd(response.data.filter((ele) => ele.professorId === id)); // Ensure only relevant reviews
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/review", {
        ...form1,
        professorId: id, // Attach professor ID to review
      });

      setAdd([...add, response.data]); // Update UI with new review
      setForm1(initialReview); // Reset form
    } catch (err) {
      console.log(err);
    }
  };

  if (!users) {
    return <p>Data is missing</p>;
  }

  return (
    <div>
      <p  style={{color:"Blue"}}>Professor ID: {id}</p>
      <p style={{color:"red"}}>Name: {users?.name2}</p>
      <p>Research Area:</p>
      <div>
        {users?.area?.split(".").map((line, index) => (
          <p key={index}>{line.trim()}</p>
        ))}
        <br />
        <form onSubmit={handleSubmit}>
          <label style={{color:"yellowgreen"}}>Write Review</label>
          <br />
          <textarea
            type="text"
            name="review"
            value={form1.review}
            style={{ width: "300px" }}
            onChange={(e) => setForm1({ ...form1, review: e.target.value })}
          />
          <br />

          {/* Star Rating Input */}
          <label>Rating (out of 5):</label>
          <br />
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                color: form1.rating >= star ? "gold" : "gray",
              }}
              onClick={() => setForm1({ ...form1, rating: star })}
            >
              ★
            </span>
          ))}
          <br />

          <label>Enter Name</label>
          <br />
          <input
            type="text"
            name="name3"
            value={form1.name3}
            style={{ width: "250px" }}
            onChange={(e) => setForm1({ ...form1, name3: e.target.value })}
          />
          <br />
          <input type="submit" className="profDetails-button" />
          <br />

          {/* Display Reviews */}
          <h3 style={{color:"yellowgreen"}}>Reviews</h3>
          <ul>
            {add.map((ele, index) => (
              <li key={index}>
                <p>{ele.review} - {ele.name3}</p>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < ele.rating ? "gold" : "gray" }}>
                    ★
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </form>
      </div>

      <Link to={`/user-project1/${id}`}>Application Form</Link>
    </div>
  );
}
