import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import LoginFormComponent from "./components/LoginFormComponent";
import RegisterFormComponent from "./components/RegisterFormComponent";
import UserProfileComponent from "./components/UserProfileComponent";

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
            <UserProfileComponent userProfile={user} />
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
        <Route path="login" element={<LoginFormComponent />} />
        <Route path="register" element={<RegisterFormComponent />} />
      </Routes>
    </div>
  );
}

export default App;
