import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../App.css"


export default function ProjectList({ user, userDispatch, onEdit }) {
  const navigate = useNavigate();
  const {user2State, user2Dispatch,handleEdit}=useContext(AuthContext)

  const handleRemove = (_id) => {
    const userConfirm = window.confirm("Are you sure you want to remove this?");
    if (userConfirm) {
      axios
        .delete(`http://localhost:3010/formsend1/${_id.trim()}`)
        .then((response) => {
          user2Dispatch({ type: "remove_user", payload: _id });
          navigate("/ProjectList"); // Optionally, this can be omitted since the state will update automatically
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="herr">
      <h1>Project List</h1>
      <ul>
        {user2State.data?.map((ele) => {
          return (
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
          );
        })}
      </ul>
    </div>
  );
}
