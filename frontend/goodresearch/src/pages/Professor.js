import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Professor() {
  const { profDispatch, prof } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfEdit = (id) => {
    profDispatch({ type: "prof_edit_id", payload: id });
    navigate("/ProfessorAcc");
  };

  return (
    <div>
      <h1>Professor's List</h1>
      {prof?.data?.length > 0 ? (
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: 50, listStyle: "none" }}>
          {prof.data.map((ele) => (
            <li key={ele._id} style={{ textAlign: "center", flex: "0 1 200px" }}>
              {/* Image Icon */}
              <img
                src="/professor-icon.png"
                alt="Professor Icon"
                width="150"
                height="150"
                style={{ display:"block", margin: "10 auto 10px"}}
              />
              {ele.name2}
              <Link to={`/user-show1/${ele._id}`} style={{ marginLeft: "10px" }}>
                Show
              </Link>
              <button onClick={() => handleProfEdit(ele._id)} style={{ marginLeft: "10px" }}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No professors found.</p>
      )}
    </div>
  );
}
