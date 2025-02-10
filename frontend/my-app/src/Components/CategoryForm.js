import { useState, useContext } from "react";
import axios from "axios";
import CategoryContext from "./contexts/CategoryContext";

export default function CategoryForm() {
  const { handleAddCategory } = useContext(CategoryContext);
  const [name, setName] = useState("");
  const [clientErrors, setClientErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const errors = {};

  const runClientValidations = () => {
    if (name.trim().length == 0) {
      errors.name = "Name cannot be blank";
    } else if (name.trim().length < 3 || name.trim().length > 20) {
      errors.name = "name should be between 3 - 20 characters long";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
    };
    // run client validations
    runClientValidations();

    // if errors are present, show the error the user
    if (Object.keys(errors).length != 0) {
      setClientErrors(errors);
    } else {
      setClientErrors({});
      axios
        .post("http://localhost:3030/categories", formData)
        .then((response) => {
          const result = response.data;
          handleAddCategory(result);
          setName("");
        })
        .catch((err) => {
          setServerErrors(err.response.data.errors);
        });
    }
  };
  return (
    <div>
      <h2>Add Category</h2>
      {serverErrors.length > 0 && (
        <div>
          <h3>Server Errors</h3>
          <ul>
            {serverErrors.map((err, i) => {
              return <li key={i}> {err.msg} </li>;
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          id="name"
        />
        {clientErrors.name && (
          <span style={{ color: "red" }}>{clientErrors.name}</span>
        )}
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}
