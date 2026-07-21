import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submitdetails(e) {
    e.preventDefault();
    setError("");
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        task: {},
      }),
    });

    if (!response.ok) {
      setError("Something went wrong");
      return;
    }
      if (response.status===400){
        setError("User already exist") 
        return 
       }
      if (response.status===500){
        setError("Internal server error") 
        return 
       }
    if (response.status === 201) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }
    return (
      <>
        <form onSubmit={submitdetails}>
          <div>
            <label htmlFor="email">Enter your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Enter your Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {error && <p>{error}</p>}
        
      </>
    );
  
}


export default Signup