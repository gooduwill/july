import axios from 'axios'
export default function TaskItem({title, description, status, handleRemoveTask,_id}){
    const deleteTask=(e)=>{
        const userConfirm=window.confirm('are you sure')
        if(userConfirm){
            axios.delete(`http://localhost:3029/task/${_id}`)
            .then((response)=>{
                const result=response.data
                handleRemoveTask(result._id)
             
            })
            .catch((err)=>{
                console.log(err.message)
                
            })
        }
    }
 return (
    <div>
        <ul>
            <li>
                {title} -{description} -{status}
                <button onClick={deleteTask}>remove</button>
            </li>
    

        
        </ul>
    </div>
 )
         
   
 
}