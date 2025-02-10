import TaskForm from "./TaskForm"
import TaskList from "./TaskList"
export default function TaskContainer({tasks,handleAddTask,handleRemoveTask}){
    return (
       <div>
         <h1> category container </h1>
         <TaskList tasks={tasks} handleRemoveTask={handleRemoveTask}/>
         <TaskForm handleAddTask={handleAddTask}/>

       </div>


    )
}