import { useEffect, useState } from "react";
import { Navigate ,useNavigate} from "react-router-dom";

function Dashboard() {
  const [task, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate=useNavigate()
    function Signout() {
  localStorage.removeItem("token");
  navigate("/login");
}

  useEffect(() => {
    async function varify() {
      let token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setAuthenticated(true);
        const data = await response.json();
        setTasks(data.task);
      }
      setLoading(false);
    }
    varify();
  }, []);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("12:00");
  async function updateTask() {
    setTasks({
      ...task,
      [input]: time,
    });
     const updatedTasks = {
    ...task,
    [input]: time,
  };
    await saveTasks(updatedTasks);
    setInput("");
    setTime("12:00");
  }
 async function deleteTask(key) {
    let temp = { ...task };
    delete temp[key];
    setTasks(temp);
    await saveTasks(temp);
    
  }
  if (loading) {
    return <h2>Loading....</h2>;
  }
  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  
  async function saveTasks(updatedTasks) {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        task: updatedTasks,
      }),
    });

    if (!response.ok) {
      alert("Couldn't save tasks");
    }
  }
  return (
    <>
      <h1>Task manager</h1>
      <h3>Manage your task easily</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={updateTask}>Add Task</button>
      {Object.keys(task).length > 0 ? (
        Object.entries(task).map(([key, value]) => {
          return (
            <div key={key}>
              {`${key}:${value}`}
              <button onClick={() => deleteTask(key)}>Delete</button>
            </div>
          );
        })
      ) : (
        <div>"No task added yet"</div>
      )}
        <button onClick={Signout}>Sign out</button>
    </>
  );
}

export default Dashboard;
