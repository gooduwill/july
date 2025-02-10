import axios from "axios";
//import "./styles.css";
import { useState } from "react";
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3029/task", form).then((response) => {
      const result = response.data;
      console.log(result);
    });
  };
  const handleFetchTasks = () => {
    axios
      .get("http://localhost:3029/task")
      .then((response) => {
        const result = response.data;
        console.log(result);
        setTasks(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRemove = (id) => {
    axios.delete(`http://localhost:3029/task/${id}`).then(() => {
      const newArr = tasks.filter((ele) => ele._id != id);

      setTasks(newArr);
    });
  };

  return (
    <div className="App">
      <h1>Task App</h1>
      <button
        onClick={() => {
          handleFetchTasks();
        }}
      >
        Fetch users
      </button>
      {tasks.map((ele) => {
        return (
          <li key={ele.id}>
            {ele.title}
            <button
              onClick={() => {
                handleRemove(ele._id);
              }}
            >
              remove
            </button>
          </li>
        );
      })}
      <form onSubmit={handleSubmit}>
        <label> Enter title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
          }}
        />
        <label> Enter description</label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => {
            setForm({ ...form, description: e.target.value });
          }}
        />
        <label> Enter status</label>
        <input
          type="text"
          value={form.status}
          onChange={(e) => {
            setForm({ ...form, status: e.target.value });
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
