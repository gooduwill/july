import TaskItem from './TaskItem'
export default function TaskList({ tasks, handleRemoveTask}) {
    return (

        <div>
            <h1>Task list</h1>
            <h2>Task list-{tasks ? tasks.length : 0}</h2>
            {tasks.map((ele) => {
                return <TaskItem
                    key={ele._id}
                    title={ele.title}
                    description={ele.description}
                    status={ele.status}
                    _id={ele._id}
                    handleRemoveTask={handleRemoveTask}
                    
                />
            })}
        </div>


    )
}