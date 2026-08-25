import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { createDefaultTasks } from "../utils/hoisting";

function Dashboard() {
  const [task, setTasks] = useState(createDefaultTasks());
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
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
    return (
      <main className="dashboard-page loading-state">
        <h2>Loading....</h2>
      </main>
    );
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
    <main className="dashboard-page">
      <header className="dashboard-header">
        <p className="eyebrow">PERSONAL WORKSPACE</p>
        <h1>Task manager</h1>
        <h3>Manage your task easily</h3>
      </header>
      <section className="task-composer" aria-label="Add a task">
        <input
          type="text"
          placeholder="What needs your attention?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={updateTask}>Add Task</button>
      </section>
      <section className="task-list" aria-label="Your tasks">
        {Object.keys(task).length > 0 ? (
          Object.entries(task).map(([key, value]) => {
            return (
              <div className="task-item" key={key}>
                <span>{`${key}:${value}`}</span>
                <button onClick={() => deleteTask(key)}>Delete</button>
              </div>
            );
          })
        ) : (
          <div className="empty-state">No task added yet</div>
        )}
      </section>
      <button className="signout-button" onClick={Signout}>
        Sign out
      </button>
    </main>
  );
}

export default Dashboard;
