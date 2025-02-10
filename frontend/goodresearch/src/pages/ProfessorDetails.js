import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const initialReview = {
  review: "",
  name3: "",
  professorId: "", // Ensure reviews are linked to a professor
};

export default function ProfessorDetails() {
  const { prof } = useContext(AuthContext);
  const [form1, setForm1] = useState(initialReview);
  const [add, setAdd] = useState([]);
  const { id } = useParams(); // Current professor ID
  const users = prof.data.find((ele) => ele._id == id);

  useEffect(() => {
    axios
      .get(`http://localhost:3010/users/review?professorId=${id}`)
      .then((response) => {
        setAdd(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3010/users/review", {
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
      <p>Professor ID: {id}</p>
      <p>Name: {users?.name2}</p>
      <p>Research Area:</p>
      <div>
        {users?.area?.split(".").map((line, index) => (
          <p key={index}>{line.trim()}</p>
        ))}
        <br />
        <form onSubmit={handleSubmit}>
          <label>Write Review give * out of 5</label>
          <br />
          <textarea
            type="text"
            name="review"
            value={form1.review}
            onChange={(e) => setForm1({ ...form1, review: e.target.value })}
          />
          <br />
          <label>Enter Name</label>
          <br />
          <input
            type="text"
            name="name3"
            value={form1.name3}
            onChange={(e) => setForm1({ ...form1, name3: e.target.value })}
          />
          <br />
          <input type="submit" />
          <br /> Reviews<br />
          {add.map((ele, index) => (
            <li key={index}>
              {ele.review} - {ele.name3}
              <br />
            </li>
          ))}
        </form>
      </div>

      <Link to={`/user-project1/${id}`}>Application Form</Link>
    </div>
  );
}
