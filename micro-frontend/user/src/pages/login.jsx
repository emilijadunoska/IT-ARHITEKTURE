import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // we are using the web gateway to make the request to the user service
    try {
      const response = await fetch(
        `http://localhost:3000/api/user?email=${email}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const usersData = await response.json();
        console.log("Users data:", usersData);

        const user = usersData.find((user) => user.password === password);

        if (user) {
          alert("Login successful. User data:", user);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          alert("Login failed. Invalid email or password.");
        }
      } else {
        alert("Login failed. User not found.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
