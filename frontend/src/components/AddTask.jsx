import { useState } from "react";

function AddTask(){
     const [task,setTasks]=useState({})
  const [input,setInput]=useState("")
  const [time,setTime]=useState("12:00")
  function updateTask(){
    setTasks({
      ...task,
      [input]:time

    }
    )
    setInput("")
    setTime("12:00")
  }
  function deleteTask(key){
    let temp={...task}
    delete temp[key]
    setTasks(temp)
  }

  return(<>
      <h1>Task manager</h1>
      <h3>Manage your task easily</h3>
      <input type="text"  value={input} onChange={(e)=>setInput(e.target.value)}/>
      <input type="time"  value={time} onChange={(e)=>setTime(e.target.value)}/>
      <button onClick={updateTask}>Add Task</button>
      {Object.keys(task).length>0?Object.entries(task).map(([key,value])=>{
        
        return <div key={key}>

          {`${key}:${value}`}
          <button onClick={()=>deleteTask(key)} >Delete</button>
        </div>
      }):
      <div>
        "No task added yet"

      </div>
}
       
  </>)
}

export default AddTask