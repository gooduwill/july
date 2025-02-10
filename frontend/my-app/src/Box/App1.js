import axios from "axios";
import "./styles.css";
import { useState } from "react";
import TaskContainer from "./TaskContainer";
export default function App() {
  const [tasks, setTasks] = useState([]);

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
   
  const handleAddTask=(newTask)=>{
    setTasks([...tasks,newTask])
  }
  const handleRemoveTask=(id)=>{
    const newArr= tasks.filter(ele=> ele._id != id)
    setTasks(newArr)
  }
   

  return (
    <div className="App1">
      <h1>Task App</h1>
      <button onClick={handleFetchTasks}>Fetch users</button>
      <TaskContainer tasks={tasks}
      handleAddTask={handleAddTask}
      handleRemoveTask={handleRemoveTask}
      />
    </div>
  );
}
