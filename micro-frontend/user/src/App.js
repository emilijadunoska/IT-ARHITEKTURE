import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/home";
import Profile from "./pages/profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser("");
  };

  return (
    <div className="UserApp">
      <div className="header">
        {isLoggedIn ? (
          <>
            <Profile userProfile={user} />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <h2>Please login or register in your account first!</h2>
            <nav className="horizontal-nav">
              <Link to="login">User/Login</Link>
              <Link to="register">User/Register</Link>
            </nav>
          </>
        )}
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
